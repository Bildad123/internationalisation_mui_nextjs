import { z } from "zod";

export const thesisSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required.")
    .max(255, "Title muss contain maximal 255 characters."),
  description: z.string().min(1, "Description is required.").max(65535),
  level: z.enum(["P_PROJECT", "BACHELOR", "MASTER"], {
    errorMap: (issue, ctx) => {
      return { message: "Select the level of the Thesis." };
    },
  }),
  status: z.enum([
    "OPEN",
    "REGISTERED",
    "IN_PROGRESS",
    "SUBMITED",
    "DEFENDED",
    "CANCELLED",
    "CLOSED",
  ]),
  startDate: z.string(),
  applicationDate: z.string(),
  submitionDate: z.string(),
});

export const patchThesisSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required.")
    .max(255, "Title muss contain maximal 255 characters.")
    .optional(),
  description: z
    .string()
    .min(1, "Description is required.")
    .max(65535)
    .optional(),
  level: z
    .enum(["P_PROJECT", "BACHELOR", "MASTER"], {
      errorMap: (issue, ctx) => {
        return { message: "Select the level of the Thesis." };
      },
    })
    .optional(),
  assignedToStudentId: z
    .string()
    .min(1, "AssignedToStudentId is Required.")
    .max(255)
    .optional()
    .nullable(),
  status: z
    .enum([
      "OPEN",
      "REGISTERED",
      "IN_PROGRESS",
      "SUBMITED",
      "DEFENDED",
      "CANCELLED",
      "CLOSED",
    ])
    .optional(),
  startDate: z.string().optional(),
  applicationDate: z.string().optional(),
  submittionDate: z.string().optional(),
});

export const studentSchema = z.object({
  firstName: z
    .string()
    .min(1, "First name is required.")
    .max(50, "First name has to many letter."),
  lastName: z
    .string()
    .min(1, "Last Name is required.")
    .max(50, "Last name has to many letter."),
  matrikel: z
    .string()
    .min(8, "Matrikel muss have minimum 8 number.")
    .max(10, "Matrikel muss have maximum 10 number.")
    .refine((data) => /^\d+$/.test(data), {
      message: "Matrikel must only contain digits.",
    }),
  email: z
    .string()
    .optional()
    .refine(
      (value) =>
        value === undefined || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
      {
        message: "Invalid email format.",
      }
    ),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(1, { message: "Password must be at least 1 character" }),
});

export const registerSchema = z.object({
  firstname: z
    .string()
    .min(1, { message: "Firstname must be at least 1 character" }),
  lastname: z
    .string()
    .min(1, { message: "Lastname must be at least 1 character" }),
  email: z.string().email(),
  password: z
    .string()
    .min(1, { message: "Password must be at least 1 character" }),
});
