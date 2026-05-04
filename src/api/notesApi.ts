// RTK Query API slice for Notes CRUD operations
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Note } from '../types/note';

export const notesApi = createApi({
  reducerPath: 'notesApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000' }),
  tagTypes: ['Notes', 'Note'],

  endpoints: (builder) => ({
    // Fetch all notes
    fetchNotes: builder.query<Note[], void>({
      query: () => '/notes',
      providesTags: ['Notes'],
    }),
    // Fetch single note
    fetchNote: builder.query<Note, string>({
      query: (id) => `/notes/${id}`,
      providesTags: ['Note'],
    }),
    // Create note
    addNewNote: builder.mutation<Note, Partial<Note>>({
      query: (newNote) => ({
        url: '/notes',
        method: 'POST',
        body: {
          favorite: false,
          pinned: false,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          ...newNote,
        },
      }),
      invalidatesTags: ['Notes'],
    }),
    // Update note
    updateNote: builder.mutation<Note, Note>({
      query: ({ id, ...rest }) => ({
        url: `/notes/${id}`,
        method: 'put',
        body: {
          ...rest,
          updatedAt: new Date().toISOString(),
        },
      }),
      invalidatesTags: ['Notes', 'Note'],
    }),
    // Delete note
    deleteNote: builder.mutation<void, string>({
      query: (id) => ({
        url: `/notes/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Notes'],
    }),
  }),
});

// Hooks
export const {
  useFetchNotesQuery,
  useFetchNoteQuery,
  useAddNewNoteMutation,
  useUpdateNoteMutation,
  useDeleteNoteMutation,
} = notesApi;
