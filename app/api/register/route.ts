import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { hash } from "bcrypt";
import prisma from "@/prisma/client";

const createUserSchema = z.object({
  firstname: z.string().min(1).max(15),
  lastname: z.string().min(1).max(15),
  email: z.string().email(),
  password: z.string().min(1).max(15),
});

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = createUserSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }
  const hashedPassword = await hash(body.password, 10);
  const newUser = await prisma.user.create({
    data: {
      name: `${body.firstname} ${body.lastname}`,
      email: body.email,
      hashedPassword: hashedPassword,
    },
  });

  return NextResponse.json(newUser, { status: 201 });
}
