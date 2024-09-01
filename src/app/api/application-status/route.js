import dbConnect from "@/lib/dbConnect";
import IdentityModel from "@/models/Identity";
import { NextResponse } from "next/server";
 

export async function POST(request) {
 await dbConnect()

    try {
   const { username } = await request.json();
   
   
   const identity = await IdentityModel.findOne({username: username});
   
   if(!identity){
     return NextResponse.json({
       success: true,
       message: "No Application Found"
     },{status: 200})
   }
   else{
    return NextResponse.json({
      success: true,
      message: identity.status
    },{status: 200})
  }

  } catch (error) {
    console.log("unexpected Error occur",error);
    return NextResponse.json({
      success: false,
      message: error.message
    },{status: 500})    
  }
  
}