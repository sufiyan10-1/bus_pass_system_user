import dbConnect from "@/lib/dbConnect";



export default async function(request){
    await dbConnect()
 const {username, paymentId} = await request.json();
  try {
    const user = await UserModel.findOne({username});

    const newPass = {paymentId, createdAt: new Date()}
    user.messages.push(newMessage)
    await user.save()
  } catch (error) {
    
  }

}