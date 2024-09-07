import dbConnect from "@/lib/dbConnect";
import IdentityModel from "@/models/Identity";
import { NextResponse } from "next/server";
 



export async function POST(request){
    await dbConnect()
 const {username, paymentId,amount} = await request.json();
  try {
    const user = await IdentityModel.findOne({username});
    if(!user){
      return NextResponse.json({
        success: false,
        message: "user not found"
      },{status: 404})
    }
    //genrate date
    const formatDate = (date) => {
      const day = String(date.getDate()).padStart(2, '0');
      const monthNames = ["January", "February", "March", "April", "May", "June", 
                          "July", "August", "September", "October", "November", "December"];
      const monthName = monthNames[date.getMonth()];
      const year = date.getFullYear();
    
      return `${day}/${monthName}/${year}`;
    };
    const endDateFunction = () => {
      const date = new Date();
      date.setDate(date.getDate() + 30);
      return formatDate(date);
    };
     const startDate =  formatDate(new Date());
     const endDate = endDateFunction()
     console.log(endDate)
    //add new pass
    const newPass = {paymentId, paymentSuccessfull:true, startDate, endDate, passFees: amount}
   
    user.monthlyPass.push(newPass)
    const savePass = await user.save()
    if(savePass){
      return NextResponse.json({
        success: true,
        message: "Pass created Successfull"
      },{status: 200})
    }
  } catch (error) {
    console.log("Unexpected error"+error);
    return NextResponse.json({
      success: false,
      message: "unexpected error"+error,
    },{status: 200})
  }
}