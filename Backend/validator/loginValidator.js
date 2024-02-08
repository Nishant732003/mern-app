const { z } = require("zod");

const loginSchema = z.object({
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
});

module.exports = loginSchema;
