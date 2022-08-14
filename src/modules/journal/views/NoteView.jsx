import { useMemo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  CloseOutlined,
  DeleteOutline,
  SaveOutlined,
  UploadOutlined,
} from "@mui/icons-material";
import {
  Button,
  Grid,
  IconButton,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { ImageGallery } from "../components";
import { useForm } from "../../common/hooks/useForm";
import {
  setActiveNote,
  startSaveNote,
  startUploadingFiles,
  startDeletingNote,
} from "../../../store/journal";
import { useRef } from "react";

export const NoteView = () => {
  const dispatch = useDispatch();
  const { activeNote, messageSaved, isSaving } = useSelector(
    (state) => state.journal
  );

  const { title, body, date, onInputChange, formState } = useForm(activeNote);

  const [alertState, setAlertState] = useState(false);

  const fileInputRef = useRef();

  const dateString = useMemo(() => {
    const noteDate = new Date(date);

    return noteDate.toUTCString();
  }, [date]);

  useEffect(() => {
    dispatch(setActiveNote(formState));
  }, [formState]);

  useEffect(() => {
    messageSaved.length ? setAlertState(true) : setAlertState(false);
  }, [messageSaved]);

  const handleClose = () => {
    setAlertState(false);
  };

  const onSaveNote = () => {
    dispatch(startSaveNote());
  };

  const onDelete = () => {
    dispatch(startDeletingNote());
  };

  const onFileInputChange = ({ target }) => {
    if (target.files === 0) return;

    dispatch(startUploadingFiles(target.files));
  };

  return (
    <Grid
      container
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      sx={{ mb: 1 }}
    >
      <Grid item>
        <Typography fontSize={39} fontWeight="light">
          {dateString}
        </Typography>
      </Grid>
      <Grid item>
        <input
          type="file"
          multiple
          accept="image/*"
          ref={fileInputRef}
          onChange={onFileInputChange}
          style={{ display: "none" }}
        />
        <IconButton
          color="primary"
          disabled={isSaving}
          onClick={() => {
            fileInputRef.current.click();
          }}
        >
          <UploadOutlined />
        </IconButton>
        <Button
          color="primary"
          sx={{ padding: 2 }}
          onClick={onSaveNote}
          disabled={isSaving}
        >
          <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
          Guardar
        </Button>
      </Grid>

      <Grid container>
        <TextField
          type="text"
          variant="filled"
          fullWidth
          placeholder="Ingrese un título"
          label="Título"
          sx={{ border: "none", mb: 1 }}
          name="title"
          value={title}
          onChange={onInputChange}
        />

        <TextField
          type="text"
          variant="filled"
          fullWidth
          multiline
          placeholder="¿Qué sucedió en el día de hoy?"
          minRows={5}
          name="body"
          value={body}
          onChange={onInputChange}
        />
      </Grid>

      <Grid container justifyContent="end">
        <Button onClick={onDelete} sx={{ mt: 2 }} color="error">
          <DeleteOutline />
          Borrar
        </Button>
      </Grid>

      {/* Image gallery */}
      <ImageGallery images={activeNote.imageUrls} />

      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={alertState}
        autoHideDuration={4000}
        action={
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
          >
            <CloseOutlined fontSize="small" />
          </IconButton>
        }
        message={messageSaved}
      />
    </Grid>
  );
};
