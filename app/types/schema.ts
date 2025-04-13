import * as z from "zod";

export const signupFormSchema = z.object({
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

export const loginSchema = z.object({
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
  csrftoken: z.string().optional(),
});

export const spaceFormSchema = z.object({
  spaceName: z.string().min(3, { message: "Space Name must be at least 3 characters" }).trim(),
  header: z.string().min(3, { message: "Header must be at least 3 characters" }),
  customDescription: z.string().min(20, { message: "Custom description must be at least 20 characters" }),
  textbuttonText: z.string().default("Submit Review"),
  videoButtonText: z.string().default("Start Recording"),
  questions: z.array(
    z.object({
      id: z.string(),
      question: z
        .string({
          required_error: "Question is required",
          invalid_type_error: "Correct the format",
        }).min(1, "Question cannot be empty")
        .max(100), 
        _id:z.string().optional()
    })
  ).min(1, { message: "At least one question is required" }), 

  questionlabel: z.string().min(5, { message: "Question Label must be at least 5 characters" }).default("Questions"),
  thankYouTitle: z.string().default("Thank You"),
  thankYouMessage: z.string().default(""),
  theme: z.enum(["light", "dark"]).default("light"),
  thankyouimg: z.boolean().default(false),
  videoreviewEnabled: z.boolean().default(false),
  ratingEnabled: z.boolean().default(false),
  redirectUrl: z.string().optional(),
  videotime: z.string().default("30"),
});


export const EditFormSchema= spaceFormSchema.omit({spaceName: true});