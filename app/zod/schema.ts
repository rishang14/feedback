import * as z from "zod";

export  const signupFormSchema = z.object({
  username: z
    .string({
      required_error: "Name is required",
      invalid_type_error: "Name must Contain 3 words",
    })
    .min(3),
  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Correct the format",
    })
    .email(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .refine(
      (value) => {
        const regex =
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]+$/;
        return regex.test(value);
      },
      {
        message:
          "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character",
      }
    ),
});
