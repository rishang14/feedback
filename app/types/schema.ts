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
  spaceName: z
    .string()
    .min(3, { message: "Space Name must be at least 3 characters" })
    .transform((val) => val.trim().toLowerCase().replace(/\s+/g, "")),
  header: z
    .string()
    .min(3, { message: "Header must be at least 3 characters" }),
  customDescription: z
    .string()
    .min(20, { message: "Custom description must be at least 20 characters" }),
  textbuttonText: z.string().default("Submit Review"),
  videoButtonText: z.string().default("Start Recording"),
  questions: z
    .array(
      z.object({
        id: z.string(),
        question: z
          .string({
            required_error: "Question is required",
            invalid_type_error: "Correct the format",
          })
          .min(1, "Question cannot be empty")
          .max(100),
        _id: z.string().optional(),
      })
    )
    .min(1, { message: "At least one question is required" }),

  questionlabel: z
    .string()
    .min(5, { message: "Question Label must be at least 5 characters" })
    .default("Questions"),
  thankYouTitle: z.string().default("Thank You"),
  thankYouMessage: z.string().default(""),
  theme: z.enum(["light", "dark"]).default("light"),
  thankyouimg: z.boolean().default(false),
  videoreviewEnabled: z.boolean().default(false),
  ratingEnabled: z.boolean().default(false),
  redirectUrl: z.string().optional(),
  videotime: z.string().default("30"),
});

export const EditFormSchema = spaceFormSchema.omit({ spaceName: true });

export const reviewForm = z.object({
  name: z
    .string({
      required_error: "Name is required",
      invalid_type_error: "Correct the format",
    })
    .min(3),
  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Correct the format",
    })
    .email(),
  rating: z.number().optional(),
  text: z
    .string({
      required_error: "Review is required",
    })
    .min(50, { message: "Review must be at least of 50 characters" }),
  walloflove: z.boolean().optional(),
  archived: z.boolean().optional(),
  consent: z.boolean().optional(),
  tags: z.array(z.string()).optional(),
});

export const SpaceNameEditSchema = z.object({
  spacename: z
    .string()
    .min(3, { message: "Space Name must be at least 3 characters" })
    .transform((val) => val.trim().toLowerCase().replace(/\s+/g, "")),
});

export const usernameSchema = z.object({
  username: z
    .string({
      required_error: "Name is required",
      invalid_type_error: "Name must Contain 3 words",
    })
    .min(3),
});

export const PasswordSchema = z.object({
  currentpass: z
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
  newPass: z
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
export const ExtendedPasswordSchema = PasswordSchema.extend({
  confirmPass: z
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
}).superRefine(({ newPass, confirmPass,currentpass }, ctx) => {
  if (newPass !== confirmPass) {
    ctx.addIssue({
      code: "custom",
      message: "Passwords do not match",
      path: ["confirmPass"],
    });
  } 
  if(newPass === currentpass){
    ctx.addIssue({
      code: "custom",
      message: "New password must be different from current password",
      path: ["newPass"],
    });
    ctx.addIssue({
      code: "custom",
      message: "New password must be different from current password",
      path: ["currentpass"],
    });

  }
});

export const TagSchema = z.object({
  tags: z.string().min(3, { message: "Tags must be at least 3 characters" }),
});
