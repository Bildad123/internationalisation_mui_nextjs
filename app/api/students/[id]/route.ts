import { studentSchema } from "@/app/[locale]/ValidationSchemas";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { error } from "console";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await request.json();
  const validation = studentSchema.safeParse(body);

  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  const student = await prisma.student.findUnique({
    where: { id: params.id },
  });

  if (!student)
    return NextResponse.json({ error: "Invalid student." }, { status: 404 });

  const updatedStudent = await prisma.student.update({
    where: { id: student.id },
    data: {
      firstName: body.firstName,
      lastName: body.lastName,
      matrikel: body.matrikel,
      email: body.email,
    },
  });

  return NextResponse.json(updatedStudent);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const student = await prisma.student.findUnique({
    where: { id: params.id },
  });

  if (!student)
    return NextResponse.json({ error: "Invalid Student." }, { status: 404 });

  await prisma.student.delete({
    where: { id: student.id },
  });

  return NextResponse.json({});
}
