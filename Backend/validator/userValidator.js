const { z } = require("zod");

const signupSchema = z.object({
  fullName: z
    .string({ required_error: "Name is required" })
    .trim()
    .min(3, { message: "Name must be at least 4 characters" })
    .max(255, { message: "Name must be of 255 characters or less" })
    .refine((data) => data[0] === data[0].toUpperCase(), {
      message: "First character of the name must be uppercase",
    }),

  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .email({ message: "Invalid email address" })
    .min(3, { message: "Email must be at least 4 characters" })
    .max(255, { message: "Email must be of 255 characters or less" }),

  password: z
    .string({ required_error: "Password is required" })
    .min(8, { message: "Password must be at least 8 characters" })
    .max(1024, { message: "Password must be of size less than 1024" })
    .refine((data) => /[A-Z]/.test(data), {
      message: "Password must contain at least one uppercase letter",
    })
    .refine((data) => /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(data), {
      message: "Password must contain at least one special character",
    }),
  phone: z
    .string()
    .min(10, { message: "Must be a valid mobile number" })
    .max(14, { message: "Must be a valid mobile number" }),


});

module.exports = signupSchema;
