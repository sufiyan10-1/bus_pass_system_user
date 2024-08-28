import dbConnect from "@/lib/dbConnect";
import IdentityModel from "@/models/Identity";
import { NextResponse } from "next/server";

export async function POST(request) {
    await dbConnect();

    try {
        const { IdNumber, username } = await request.json();

        // Find identity by IdNumber
        const identity = await IdentityModel.findOne({ IdNumber: IdNumber });

        if (identity) {
            // Check if the username matches
            if (identity.username === username) {
                console.log("Identity Found");
                return NextResponse.json({
                    success: true,
                    message: identity
                }, { status: 200 });
            } else {
                console.log("User not authenticated with this identity");
                return NextResponse.json({
                    success: false,
                    message: "Identity found, but user not authenticated with this account"
                }, { status: 403 }); // Using 403 Forbidden for unauthorized access
            }
        } else {
            console.log("Identity Not Found");
            return NextResponse.json({
                success: false,
                message: "Identity Not Found"
            }, { status: 400 }); // 400 Bad Request for identity not found
        }
    } catch (error) {
        console.log("Unexpected Error occurred:", error);
        return NextResponse.json({
            success: false,
            message: "Unexpected error"
        }, { status: 500 }); // 500 Internal Server Error for unexpected issues
    }
}
