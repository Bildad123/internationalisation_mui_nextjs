import { useTranslate } from "@/app/Translations";
import StudentActions from "./StudentActions";

const TranslatedStudentActions = () => {
  const translations = {
    filter: useTranslate("students.list.studentActions.filter"),
    resetFilter: useTranslate("students.list.studentActions.resetFilter"),
    newStudent: useTranslate("students.list.studentActions.newStudent"),
  };

  const searchFilterTranslations = {
    placeholder: useTranslate("students.list.studentSearchFilter.placeholder"),
  };
  return (
    <>
      <StudentActions
        translations={translations}
        searchFilterTranslations={searchFilterTranslations}
      />
    </>
  );
};

export default TranslatedStudentActions;
