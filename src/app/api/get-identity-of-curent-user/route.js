import dbConnect from "@/lib/dbConnect";
import IdentityModel from "@/models/Identity";
import { NextResponse } from "next/server";



export async function POST(request){
    await dbConnect();
 
try {
    const {username} = await request.json();
    const response = await IdentityModel.findOne({username:username});
    if(response.data){
    return NextResponse.json({
        success: true,
        message: response
    },{status: 200});
  }
  else{
    return NextResponse.json({
        success: false,
        message:  "there is no identity present"
    },{status: 404});
  }
} catch (error) {
    console.log("unexpected error occer"+error);
    return NextResponse.json({
        success: false,
        message: error
    },{status: 500});
}


}