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

  textbuttonText: z.string().default("Submit Review"), 
  videoButtonText: z.string().default("Start Recording"),

  questions: z.array(
    z.object({
      id: z.string(), 
      questions: z
        .string({
          required_error: "Question is required",
          invalid_type_error: "Correct the format",
        })
        .max(100), 
    })
  ).default([]),

  questionlabel: z.string().min(5, {
    message: "Question Label must be at least 5 characters",
  }).default("Questions"),

  thankYouTitle: z.string().default("Thank You"), 
  thankYouMessage: z.string().default(""), 
  theme: z.enum(["light", "dark"]).default("light"), 

  thankyouimg: z.boolean().default(false), 
  videoreviewEnabled: z.boolean().default(false), 
  ratingEnabled: z.boolean().default(false),

  redirectUrl: z.string().url().optional(), 

  videotime: z.string().default("30"), 
});
