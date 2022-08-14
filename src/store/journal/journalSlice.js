import { createSlice } from "@reduxjs/toolkit";

export const journalSlice = createSlice({
  name: "journal",
  initialState: {
    isSaving: false,
    messageSaved: "",
    notes: [],
    activeNote: null,
    // active: {
    //   id: 'abc123',
    //   title: '',
    //   body: '',
    //   date: 12341234,
    //   imageUrls: []
    // }
  },
  reducers: {
    savingNewNote: (state) => {
      state.isSaving = true;
    },
    addNewEmptyNote: (state, { payload }) => {
      state.notes.push(payload);
      state.isSaving = false;
    },
    setActiveNote: (state, { payload }) => {
      state.activeNote = payload;
      state.messageSaved = "";
    },
    setNotes: (state, { payload }) => {
      state.notes = payload;
    },
    setSaving: (state, action) => {
      state.isSaving = true;
      state.messageSaved = "";
      // TODO: message error
    },
    noteUpdated: (state, { payload }) => {
      state.isSaving = false;
      state.notes = state.notes.map((note) => {
        return note.id === payload.id ? payload : note;
      });

      state.messageSaved = `Nota actualizada correctamente`;
    },
    setPhotosToActiveNote: (state, { payload }) => {
      if (!!state.activeNote.imageUrls) {
        state.activeNote.imageUrls = [
          ...state.activeNote.imageUrls,
          ...payload,
        ];
      } else {
        state.activeNote.imageUrls = [...payload];
      }
      state.isSaving = false;
    },
    clearNotesLogout: (state) => {
      state.isSaving = false;
      state.messageSaved = "";
      state.notes = [];
      state.activeNote = null;
    },
    deleteNoteById: (state, { payload }) => {
      state.activeNote = null;
      state.notes = state.notes.filter((note) => note.id !== payload);
    },
  },
});

export const {
  savingNewNote,
  addNewEmptyNote,
  setActiveNote,
  setNotes,
  setSaving,
  noteUpdated,
  setPhotosToActiveNote,
  clearNotesLogout,
  deleteNoteById,
} = journalSlice.actions;
