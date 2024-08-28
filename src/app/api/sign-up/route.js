import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";
import bcrypt from 'bcryptjs';




export async function POST(request){
 await dbConnect();

 try{
    const {password, phoneNo,username,  } = await request.json();
    const existingByUsername = await UserModel.findOne({
        username,
    })
    if(existingByUsername){
        return Response.json(
            {
                success: false,
                message: "user name is already taken"
            },{status: 400}
        );
    }
    const existingUserByPhoneNo = await UserModel.findOne({phoneNo});
 

    if(existingUserByPhoneNo){
  
        return Response.json({
            success: false,
            message: 'user already exists with this Phone Number',
        },{status: 400}
       )
 
    } else {

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new UserModel({
        username,
        phoneNo,
        password: hashedPassword,

      });

      await newUser.save();
    }

    return Response.json(
      {
        success: true,
        message: 'User registered successfully. Please verify your account.',
      },
      { status: 201 }
    );
 }catch (error){
  console.error('Error registering user:', error);
    return Response.json(
      {
        success: false,
        message: 'Error registering user',
      },
      { status: 500 }
    );
 }

}