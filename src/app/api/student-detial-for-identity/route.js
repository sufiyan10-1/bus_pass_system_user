import dbConnect from "@/lib/dbConnect";
import { UploadImage } from "@/lib/cloudnary";
import IdentityModel from "@/models/Identity";
import axios from "axios";
 
 


export  async function POST(request){
   await dbConnect();

   try {
        
  const formData = await request.formData();
 

   //get data
   const username = formData.get("username") 
   const studentName = formData.get("studentName") 
   const studentAddress = formData.get("studentAddress") 
   const studentDOB = formData.get("studentDOB") 
   const nameOfCollegeOrSchool = formData.get("nameOfCollegeOrSchool") 
   const addressOfCollegeOrSchool = formData.get("addressOfCollegeOrSchool") 
   const studClass = formData.get("studClass") 
   const distanceFrom = formData.get("distanceFrom") 
   const distanceTo = formData.get("distanceTo") 
 
 


           const encoding = "base64"; 
   //get files 
           const studentSign = formData.get("studentSign") 
           const file1Buffer = await studentSign.arrayBuffer();
           const mimeType1 = studentSign.type;
           const base64Data1 = Buffer.from(file1Buffer).toString("base64");
           const uriOfStudentSign = "data:" + mimeType1 + ";" + encoding + "," + base64Data1;
            
           
           const studentPhoto = formData.get("studentPhoto") 
           const file2Buffer = await studentPhoto.arrayBuffer();
           const mimeType2 = studentPhoto.type;
           const base64Data2 = Buffer.from(file2Buffer).toString("base64");
           const uriOfStudentPhoto = "data:" + mimeType2 + ";" + encoding + "," + base64Data2;
         
           const aadharCard = formData.get("aadharCard") 
           const file3Buffer = await aadharCard.arrayBuffer();
           const mimeType3 = studentSign.type;
           const base64Data3 = Buffer.from(file3Buffer).toString("base64");
           const uriOfAadharCard  = "data:" + mimeType3 + ";" + encoding + "," + base64Data3;
 
           const bonafied = formData.get("bonafied") 
           const file4Buffer = await bonafied.arrayBuffer();
           const mimeType4 = bonafied.type;
           const base64Data4 = Buffer.from(file4Buffer).toString("base64");
           const uriOfBonafied= "data:" + mimeType4 + ";" + encoding + "," + base64Data4;

 
           const feesRecipt = formData.get("feesRecipt") 
           const file5Buffer = await feesRecipt.arrayBuffer();
           const mimeType5 = feesRecipt.type;
           const base64Data5 = Buffer.from(file5Buffer).toString("base64");
           const uriOfFeesRecipt = "data:" + mimeType5 + ";" + encoding + "," + base64Data5;
   
    //upload on cloudnary
           const studentSignUpload = await UploadImage(uriOfStudentSign);
           const studentPhotoUpload = await UploadImage(uriOfStudentPhoto);
           const aadharCardUpload = await UploadImage(uriOfAadharCard);
           const bonafiedUpload = await UploadImage(uriOfBonafied);
           const feesReciptUpload = await UploadImage(uriOfFeesRecipt);


   // extract userName
    
    
   const academicYearFrom = new Date().getFullYear()
   const academicYearTo = (new Date().getFullYear())+1  
 //genrate IdNumber
  const IdNumber = Math.floor(1000000000 + Math.random() * 9000000000);

   const newIdentity = new IdentityModel({
        username,
        studentName,
        studentAddress, 
        studentDOB, 
        nameOfCollegeOrSchool, 
        addressOfCollegeOrSchool,
        studClass, 
        academicYearFrom: `july-${academicYearFrom}`,
        academicYearTo: `july-${academicYearTo}`,
        distanceFrom,
        distanceTo,  
        studentSign: studentSignUpload.url,
        studentPhoto: studentPhotoUpload.url,
        aadharCard: aadharCardUpload.url,
        bonafied: bonafiedUpload.url,
        feesRecipt: feesReciptUpload.url,
        identityVerified: false,
        status: 'Pending',
        IdNumber
    })    

    await newIdentity.save();
    
    return Response.json({
       success: true,
       message: "identity data send successful"
    },{status: 200})

   } catch (error) {
    console.log("error while sending identity data", error);
    return Response.json({
        success: false,
        message: "error while sending identity data"
    },{status: 500})  
   }

}  