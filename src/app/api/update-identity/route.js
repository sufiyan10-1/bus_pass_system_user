import dbConnect from "@/lib/dbConnect";
import IdentityModel from "@/models/Identity";
import { NextResponse } from "next/server";
import { UploadImage } from "@/lib/cloudnary";

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

        // Function to check if the URL is a Cloudinary URL
        const isCloudinaryUrl = (url) => url && url.includes('res.cloudinary.com');

        // Fetch the current identity document
        const existingIdentity = await IdentityModel.findOne({ username });

        // Upload the files only if a valid Cloudinary URL is not present
        const studentSignUpload = isCloudinaryUrl(existingIdentity.studentSign) 
            ? existingIdentity.studentSign 
            : await uploadFile(formData.get("studentSign"));

        const studentPhotoUpload = isCloudinaryUrl(existingIdentity.studentPhoto) 
            ? existingIdentity.studentPhoto 
            : await uploadFile(formData.get("studentPhoto"));

        const aadharCardUpload = isCloudinaryUrl(existingIdentity.aadharCard) 
            ? existingIdentity.aadharCard 
            : await uploadFile(formData.get("aadharCard"));

        const bonafiedUpload = isCloudinaryUrl(existingIdentity.bonafied) 
            ? existingIdentity.bonafied 
            : await uploadFile(formData.get("bonafied"));

        const feesReciptUpload = isCloudinaryUrl(existingIdentity.feesRecipt) 
            ? existingIdentity.feesRecipt 
            : await uploadFile(formData.get("feesRecipt"));

        // Update the identity with the existing or new Cloudinary URLs
        const updatedIdentity = await IdentityModel.findOneAndUpdate(
            { username },
            {
                $set: {
                    studentName,
                    studentAddress,
                    studentDOB,
                    nameOfCollegeOrSchool,
                    addressOfCollegeOrSchool,
                    studClass,
                    distanceFrom,
                    distanceTo,
                    studentSign: studentSignUpload?.url || existingIdentity.studentSign,
                    studentPhoto: studentPhotoUpload?.url || existingIdentity.studentPhoto,
                    aadharCard: aadharCardUpload?.url || existingIdentity.aadharCard,
                    bonafied: bonafiedUpload?.url || existingIdentity.bonafied,
                    feesRecipt: feesReciptUpload?.url || existingIdentity.feesRecipt,
                    identityVerified: false,
                    status: 'Pending',
                },
            },
            { new: true },
        );

        return NextResponse.json({
            success: true,
            message: updatedIdentity,
        }, { status: 200 });

    } catch (error) {
        console.log("Unexpected Error occurred:", error);
        return NextResponse.json({
            success: false,
            message: "Unexpected error"
        }, { status: 500 });
    }
}
