import { z } from "zod";
export const invoiceSchema = z.object({
  clientName: z.string().min(3, { message: "Add a client name" }),
  dueDate: z.date(),
  amount: z.number().min(1, { message: "Add the amount" }),
  paymentFor: z
    .string()
    .min(10, { message: "Please add a the product for payment" }),
  description: z.string().min(30, {
    message: "Description must not been less the 30 characters",
  }),
});
export const clientSchema = z.object({
  clientName: z.string().min(3, { message: "Add the client name" }),
  email: z
    .string()
    .min(1, { message: "This field has to be filled." })
    .email("This is not a valid email"),
  birthday: z.date(),
  gender: z.string().min({ message: "This field has to be filled." }),
  phoneNumber: z.number().min(11, { message: "Invalid number" }),
});
