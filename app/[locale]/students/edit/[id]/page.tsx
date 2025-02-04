import React from "react";
import { notFound } from "next/navigation";
import prisma from "@/prisma/client";
import { useTranslateAsync } from "@/app/Translations";
import StudentsForm from "@/app/[locale]/students/_components/StudentsForm";

interface Props {
  params: { id: string };
}
const EditStudentPage = async ({ params }: Props) => {
  const student = await prisma?.student.findUnique({
    where: { id: params.id },
  });
  const translations = {
    firstname: await useTranslateAsync(
      "students.components.studentsForm.firstname"
    ),
    lastname: await useTranslateAsync(
      "students.components.studentsForm.lastname"
    ),
    matriculation: await useTranslateAsync(
      "students.components.studentsForm.matriculation"
    ),
    email: await useTranslateAsync("students.components.studentsForm.email"),
    update: await useTranslateAsync("students.components.studentsForm.update"),
    create: await useTranslateAsync("students.components.studentsForm.create"),

    firstnameMinValidationMessage: await useTranslateAsync(
      "students.validationSchema.firstnameValidationMessage.min"
    ),
    firstnameMaxValidationMessage: await useTranslateAsync(
      "students.validationSchema.firstnameValidationMessage.max"
    ),

    lastnameMinValidationMessage: await useTranslateAsync(
      "students.validationSchema.lastnameValidationMessage.min"
    ),
    lastnameMaxValidationMessage: await useTranslateAsync(
      "students.validationSchema.lastnameValidationMessage.max"
    ),

    matriculationMinValidationMessage: await useTranslateAsync(
      "students.validationSchema.matriculationValidationMessage.min"
    ),
    matriculationMaxValidationMessage: await useTranslateAsync(
      "students.validationSchema.matriculationValidationMessage.max"
    ),

    matriculationRefineValidationMessage: await useTranslateAsync(
      "students.validationSchema.matriculationValidationMessage.refine"
    ),
    emailValidationMessage: await useTranslateAsync(
      "students.validationSchema.emailValidationMessage"
    ),
  };
  if (!student) notFound();

  return (
    <>
      <StudentsForm translations={translations} student={student} />
    </>
  );
};

export default EditStudentPage;
