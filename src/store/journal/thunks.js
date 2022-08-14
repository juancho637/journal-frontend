import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite";
import { fileUpload } from "../../modules/common/helpers/fileUpload";
import { loadNotes } from "../../modules/journal/helpers/loadNotes";
import { FirebaseFirestore } from "../../services/firebase/config";
import {
  addNewEmptyNote,
  setActiveNote,
  setNotes,
  setSaving,
  noteUpdated,
  setPhotosToActiveNote,
  deleteNoteById,
} from "./";

export const startNewNote = () => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;

    const newNote = {
      title: "",
      body: "",
      date: new Date().getTime(),
    };

    const newDock = doc(collection(FirebaseFirestore, `${uid}/journal/notes`));
    await setDoc(newDock, newNote);

    newNote.id = newDock.id;

    dispatch(addNewEmptyNote(newNote));
    dispatch(setActiveNote(newNote));
  };
};

export const startLoadingNotes = () => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;
    if (!uid) throw new Error("El UID del usuario no existe");

    const notes = await loadNotes(uid);

    dispatch(setNotes(notes));
  };
};

export const startSaveNote = () => {
  return async (dispatch, getState) => {
    dispatch(setSaving());
    const { uid } = getState().auth;
    const { activeNote } = getState().journal;

    const noteToFireStore = { ...activeNote };
    delete noteToFireStore.id;

    const docRef = doc(
      FirebaseFirestore,
      `${uid}/journal/notes/${activeNote.id}`
    );
    await setDoc(docRef, noteToFireStore, { merge: true });

    dispatch(noteUpdated(activeNote));
  };
};

export const startUploadingFiles = (files = []) => {
  return async (dispatch) => {
    dispatch(setSaving());

    const fileUploadPromises = [];

    for (const file of files) {
      fileUploadPromises.push(fileUpload(file));
    }

    const photosUrls = await Promise.all(fileUploadPromises);

    dispatch(setPhotosToActiveNote(photosUrls));
  };
};

export const startDeletingNote = () => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;
    const { activeNote } = getState().journal;

    const docRef = doc(
      FirebaseFirestore,
      `${uid}/journal/notes/${activeNote.id}`
    );

    const res = await deleteDoc(docRef);

    dispatch(deleteNoteById(activeNote.id));
  };
};
