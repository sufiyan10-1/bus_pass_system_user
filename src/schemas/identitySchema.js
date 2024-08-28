import {z} from "zod"
 
 
export const identitySchema = z.object({
    studentName: z.string().min(10,{message: "Name must be 10  Charecter"}).max(50,{message: "Name must be 10  Charecter"}),
    studentAddress: z.string().min(10,{message: "student Address must be 10  Charecter"}).max(50,{message: "student Address must be 10  Charecter"}),
    studentDOB: z.string(),
    nameOfCollegeOrSchool: z.string().min(10,{message: "name Of College Or School must be 10  Charecter"}).max(50,{message: "name Of College Or School must be 10  Charecter"}),
    addressOfCollegeOrSchool: z.string().min(10,{message: "address Of College Or School must be 10  Charecter"}).max(50,{message: "address Of CollegeOr School must be 10  Charecter"}),
    studClass: z.string(),
    distanceFrom: z.string(),
    distanceTo: z.string(),
    // studentSign: z.instanceof(File),
    // studentPhoto: z.instanceof(File),
    // aadharCard: z.instanceof(File),
    // bonafied: z.instanceof(File),
    // feesRecipt: z.instanceof(File),
})