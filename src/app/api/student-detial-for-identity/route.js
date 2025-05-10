import dbConnect from "@/lib/dbConnect";
import { UploadImage } from "@/lib/cloudnary"; // Make sure the path is correct
import IdentityModel from "@/models/Identity";

export async function POST(request) {
  await dbConnect();

  try {
    const formData = await request.formData();

    // Extract form data
    const username = formData.get("username");
    const studentName = formData.get("studentName");
    const studentAddress = formData.get("studentAddress");
    const studentDOB = formData.get("studentDOB");
    const nameOfCollegeOrSchool = formData.get("nameOfCollegeOrSchool");
    const addressOfCollegeOrSchool = formData.get("addressOfCollegeOrSchool");
    const studClass = formData.get("studClass");
    const distanceFrom = formData.get("distanceFrom");
    const distanceTo = formData.get("distanceTo");

    // Helper function to convert ReadableStream to Buffer
    const streamToBuffer = async (stream) => {
      const chunks = [];
      const reader = stream.getReader();
      let done, value;

      while (!done) {
        ({ done, value } = await reader.read());
        if (value) chunks.push(value);
      }

      return Buffer.concat(chunks);
    };

    // Function to handle file uploads
    const uploadFile = async (file) => {
      if (!file) return null;

      const buffer = await streamToBuffer(file.stream()); // Convert stream to buffer
      return await UploadImage(buffer, file.type); // Upload buffer to Cloudinary
    };

    // Upload the files
    const studentSignUpload = await uploadFile(formData.get("studentSign"));
    const studentPhotoUpload = await uploadFile(formData.get("studentPhoto"));
    const aadharCardUpload = await uploadFile(formData.get("aadharCard"));
    const bonafiedUpload = await uploadFile(formData.get("bonafied"));
    const feesReciptUpload = await uploadFile(formData.get("feesRecipt"));

    // Generate ID Number and academic year
    const academicYearFrom = new Date().getFullYear();
    const academicYearTo = academicYearFrom + 1;
    const IdNumber = Math.floor(1000000000 + Math.random() * 9000000000);

    // Save new identity to database
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
      studentSign: studentSignUpload?.url || '',
      studentPhoto: studentPhotoUpload?.url || '',
      aadharCard: aadharCardUpload?.url || '',
      bonafied: bonafiedUpload?.url || '',
      feesRecipt: feesReciptUpload?.url || '',
      identityVerified: false,
      status: 'Pending',
      IdNumber,
    });

    await newIdentity.save();

    return new Response(
      JSON.stringify({ success: true, message: "Identity data sent successfully" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error while sending identity data", error);
    return new Response(
      JSON.stringify({ success: false, message: "Error while sending identity data" }),
      { status: 500 }
    );
  
  }
}
