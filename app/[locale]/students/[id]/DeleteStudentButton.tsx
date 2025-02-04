"use client";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  Box,
} from "@mui/material";

import axios from "axios";
import { useRouter } from "next/navigation";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useState } from "react";

interface Translations {
  delete: string;
  confirmation: string;
  deleteWarning: string;
  cancel: string;
  cannotDeleteDialogTitle: string;
  cannotDelete: string;
  ok: string;
}
interface Props {
  studentId: string;
  translations: Translations;
}

const DeleteStudentButton = ({
  studentId,

  translations,
}: Props) => {
  const router = useRouter();
  const [error, setError] = useState(false);
  const [isDeleting, setDeleting] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const {
    delete: deleteTranslation,
    confirmation,
    deleteWarning,
    cancel,
    cannotDeleteDialogTitle,
    cannotDelete,
    ok,
  } = translations;

  const deleteStudent = async () => {
    try {
      setDeleting(true);
      await axios.delete("/api/students/" + studentId);
      router.push("/students/list");
      router.refresh();
    } catch (error) {
      setDeleting(false);
      setError(true);
    }
  };

  const handleDialogClose = () => setOpenDialog(false);

  return (
    <>
      <Button
        color="error"
        onClick={() => setOpenDialog(true)}
        disabled={isDeleting}
        startIcon={<DeleteForeverIcon />}
        variant="contained"
      >
        <Typography variant="body2" sx={{ pr: 1 }}>
          {deleteTranslation}
        </Typography>
      </Button>

      {/* Confirmation Dialog */}
      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>{confirmation}</DialogTitle>
        <DialogContent>
          <Typography variant="body2">{deleteWarning}</Typography>
        </DialogContent>
        <DialogActions>
          <Box
            sx={{ display: "flex", justifyContent: "space-between" }}
            width={"100%"}
          >
            {" "}
            <Button onClick={handleDialogClose} color="secondary">
              {cancel}
            </Button>
            <Button
              onClick={deleteStudent}
              color="error"
              variant="contained"
              disabled={isDeleting}
            >
              {deleteTranslation}
            </Button>
          </Box>
        </DialogActions>
      </Dialog>

      {/* Error Dialog */}
      <Dialog open={error} onClose={() => setError(false)}>
        <DialogTitle>{cannotDeleteDialogTitle}</DialogTitle>
        <DialogContent>
          <Typography variant="body2">{cannotDelete}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setError(false)} color="primary">
            {ok}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DeleteStudentButton;
