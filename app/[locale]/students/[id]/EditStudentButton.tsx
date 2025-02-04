import { useTranslate } from "@/app/Translations";

import Link from "next/link";
import EditIcon from "@mui/icons-material/Edit";
import { Button } from "@mui/material";

const EditStudentButton = ({ id }: { id: string }) => {
  const translations = {
    edit: useTranslate("students.id.editStudentButton.edit"),
  };
  const { edit } = translations;

  return (
    <Link href={`/students/edit/${id}`} passHref>
      <Button variant="contained" fullWidth startIcon={<EditIcon /> }>{edit}</Button>
    </Link>
  );
};

export default EditStudentButton;
