import { studentSchema } from "@/app/[locale]/ValidationSchemas";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";

export async function GET(request: NextRequest) {
  const students = await prisma.student.findMany({
    orderBy: { firstName: "asc" },
  });
  return NextResponse.json(students);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = studentSchema.safeParse(body);

  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  const newStudent = await prisma.student.create({
    data: {
      firstName: body.firstName,
      lastName: body.lastName,
      matrikel: body.matrikel,
      email: body.email,
    },
  });

  return NextResponse.json(newStudent, { status: 201 });
}
