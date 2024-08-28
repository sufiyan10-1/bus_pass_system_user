import {z} from "zod"

export const passSchema = z.object({
    IdNumber: z.number().min(10, {message: "Id Number must be 10 digit"}).max(10,{message: "Id Number must be 10 digit"})  
})