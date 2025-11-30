import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchNotes, deleteNote } from "../../services/noteService";
import type { Note, NotesResponse } from "../../types/note";
import css from "./NoteList.module.css";

interface NoreListProps {
  page: number;
  perPage: number;
  search?: string;
}

export default function NoteList({ page, perPage, search }: NoreListProps) {
  const qc = useQueryClient();

  const { data, isLoading, error } = useQuery<NotesResponse>({
    queryKey: ["notes", { page, perPage, search }],
    queryFn: () => fetchNotes({ page, perPage, search }),
  });
  console.log("Notes data:", data);
  const handleDelete = async (id: string) => {
    if (!confirm("Delete this note?")) return;

    try {
      await deleteNote(id);
      qc.invalidateQueries({ queryKey: ["notes", { page, perPage, search }] });
    } catch {
      alert("Failed to delete note");
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <div className={css.error}>Error loading notes</div>;

  if (!data?.notes || data.notes.length === 0) {
    return <div className={css.empty}>No notes found</div>;
  }

  return (
    <ul className={css.list}>
      {data.notes.map((note: Note) => (
        <li key={note.id} className={css.listItem}>
          <h2 className={css.title}>{note.title}</h2>
          <p className={css.content}>{note.content}</p>
          <div className={css.footer}>
            <span className={css.tag}>{note.tag}</span>
            <button
              className={css.button}
              onClick={() => handleDelete(note.id)}
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
