import axios from "axios";
import type { AxiosResponse } from "axios";

import type { Note, NoteTag, NotesResponse } from "../types/note";

const BASE_URL = "https://notehub-public.goit.study/api/notes";

const token = import.meta.env.VITE_NOTEHUB_TOKEN;

export interface FetchNotesParams {
  page?: number;
  perPage?: number;
  search?: string;
}

export interface CreateNoteParams {
  title: string;
  content?: string;
  tag: NoteTag;
}

// Axios instance
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

// GET /notes
export const fetchNotes = async (
  params: FetchNotesParams
): Promise<NotesResponse> => {
  const response: AxiosResponse<NotesResponse> = await api.get("/", { params });
  return response.data;
};

// POST /notes
export const createNote = async (newNote: CreateNoteParams): Promise<Note> => {
  const response: AxiosResponse<Note> = await api.post("/", newNote);
  return response.data; // <- чистый Note
};

// DELETE /notes/:id
export const deleteNote = async (id: string): Promise<Note> => {
  const response: AxiosResponse<Note> = await api.delete(`/${id}`);
  return response.data; // <- чистый Note
};
