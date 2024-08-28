import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dbConnect from '@/lib/dbConnect';
import UserModel from '@/models/User';
import { NextResponse } from 'next/server';

export async function POST(request) {
    await dbConnect();
    try {
        const { identifier, password } = await request.json();

        // Check if user exists
        const user = await UserModel.findOne({
            $or: [
              { phoneNo: isNaN(identifier) ? undefined : identifier },
              { username: isNaN(identifier) ? identifier : undefined }
            ].filter(condition => condition !== undefined)
          });

        if (!user) {
            return NextResponse.json({ error: "User does not exist" }, { status: 400 });
        }

        // Check if password is correct
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return NextResponse.json({ error: "Invalid password" }, { status: 400 });
        }

        // Create token data
        const tokenData = {
            id: user._id,
            username: user.username,
            phoneNo: user.phoneNo,
        };

        // Create token
        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET, { expiresIn: '1d' });

        // Create a response
        const response = NextResponse.json({
            message: "Login successful",
            success: true,
        });

        // Set the token as a cookie
        response.cookies.set('token', token, {
            httpOnly: true,
            sameSite: 'strict',
            path: '/',
            secure: process.env.NODE_ENV === 'production',
        });

        return response;

    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
