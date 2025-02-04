import { useTranslate } from "@/app/Translations";
import DeleteStudentButton from "./DeleteStudentButton";

const TranslatedDeleteStudentButton = ({
  studentId,
}: {
  studentId: string;
}) => {
  const translations = {
    delete: useTranslate("students.id.deleteStudentButton.delete"),
    confirmation: useTranslate("students.id.deleteStudentButton.confirmation"),
    deleteWarning: useTranslate(
      "students.id.deleteStudentButton.deleteWarning"
    ),
    cancel: useTranslate("students.id.deleteStudentButton.cancel"),
    cannotDeleteDialogTitle: useTranslate(
      "students.id.deleteStudentButton.cannotDeleteDialogTitle"
    ),
    cannotDelete: useTranslate("students.id.deleteStudentButton.cannotDelete"),
    ok: useTranslate("students.id.deleteStudentButton.ok"),
  };

  return (
    <>
      <DeleteStudentButton
        translations={translations}
        studentId={studentId}
      
      />
    </>
  );
};

export default TranslatedDeleteStudentButton;
