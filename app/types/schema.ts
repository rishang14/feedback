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
    .min(5, { message: "Password must be at least 5 characters long" })
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


export const loginSchema=z.object({ 
  email: z
  .string({
    required_error: "Email is required",
    invalid_type_error: "Correct the format",
  })
  .email(),
password: z
  .string()
  .min(5, { message: "Password must be at least 5 characters long" })
  .refine(
    (value) => {
      const regex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]+$/;
      return regex.test(value);
    },
    {
      message:
        "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character",
    },
  ) ,
  csrftoken:z.string().optional()
}) 



export const spaceFormSchema = z.object({
  spaceName: z.string({
    required_error: "Space Name is required",
    invalid_type_error: "Correct the format",
  }),
  header: z.string({
    required_error: "Header is required",
    invalid_type_error: "Correct the format",
  }),
  customDescription: z.string({
    required_error: "Custom description is required",
    invalid_type_error: "Correct the format",
  }),
  messageLabel: z.string({
    required_error: "Message Label is required",
    invalid_type_error: "Correct the format",
  }),
  textbuttonText: z.string({
    required_error: "Text Button Text is required",
    invalid_type_error: "Correct the format",
  }),
  videoButtonnText: z.string({
    required_error: "Video Button Text is required",
    invalid_type_error: "Correct the format",
  }),
  questions: z.array(
    z.object({
      id: z.string(),
      questions: z.string({
        required_error: "Question is required",
        invalid_type_error: "Correct the format",
      }),
    })
  ),
  questionlabel: z.string({
    required_error: "Question Label is required",
    invalid_type_error: "Correct the format",
  }),
  buttonColor: z.string({
    required_error: "Button Color is required",
    invalid_type_error: "Correct the format",
  }),
  buttonTextColor: z.string({
    required_error: "Button Text Color is required",
    invalid_type_error: "Correct the format",
  }),
  thankYouTitle: z.string().optional().default("Thank you"),
  thankYouMessage: z.string().optional(),
  theme: z.enum(["light", "dark"]).default("light"),
  Thankyouimg: z.boolean().default(false),
});