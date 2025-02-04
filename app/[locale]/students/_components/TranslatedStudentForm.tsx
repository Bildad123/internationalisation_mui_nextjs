import StudentsForm from "@/app/[locale]/students/_components/StudentsForm";
import { useTranslate } from "@/app/Translations";
const TranslatedStudentForm = () => {
  const translations = {
    firstname: useTranslate("students.components.studentsForm.firstname"),
    lastname: useTranslate("students.components.studentsForm.lastname"),
    matriculation: useTranslate(
      "students.components.studentsForm.matriculation"
    ),
    email: useTranslate("students.components.studentsForm.email"),
    update: useTranslate("students.components.studentsForm.update"),
    create: useTranslate("students.components.studentsForm.create"),
    firstnameMinValidationMessage: useTranslate(
      "students.validationSchema.firstnameValidationMessage.min"
    ),
    firstnameMaxValidationMessage: useTranslate(
      "students.validationSchema.firstnameValidationMessage.max"
    ),

    lastnameMinValidationMessage: useTranslate(
      "students.validationSchema.lastnameValidationMessage.min"
    ),
    lastnameMaxValidationMessage: useTranslate(
      "students.validationSchema.lastnameValidationMessage.max"
    ),

    matriculationMinValidationMessage: useTranslate(
      "students.validationSchema.matriculationValidationMessage.min"
    ),
    matriculationMaxValidationMessage: useTranslate(
      "students.validationSchema.matriculationValidationMessage.max"
    ),

    matriculationRefineValidationMessage: useTranslate(
      "students.validationSchema.matriculationValidationMessage.refine"
    ),
    emailValidationMessage: useTranslate(
      "students.validationSchema.emailValidationMessage"
    ),
  };

  return (
    <>
      <StudentsForm translations={translations} />
    </>
  );
};

export default TranslatedStudentForm;
