// Page for creating a new note using NoteForm and handling submission
import { useNavigate } from 'react-router-dom';

import { Box, Typography } from '@mui/material';

import { useAddNewNoteMutation, useFetchNotesQuery } from '../api/notesApi';

import NoteForm from '../components/notes/NoteForm';

export default function CreateNotePage() {
  const navigate = useNavigate();
  const { data: allNotes } = useFetchNotesQuery();
  const [addNewNote, { isLoading }] = useAddNewNoteMutation();

  // Create note with default metadata and redirect to home
  const handleSubmit = async (data: any) => {
    const now = new Date().toISOString();

    await addNewNote({
      ...data,
      createdAt: now,
      updatedAt: now,
      favorite: false,
      pinned: false,
    });

    navigate('/');
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        p: 3,
      }}
    >
      <Box sx={{ width: '100%', maxWidth: '650px' }}>
        <Typography
          variant='h5'
          mb={4}
          sx={{ fontWeight: 600, textAlign: 'center' }}
        >
          Create New Note
        </Typography>
        <NoteForm
          allNotes={allNotes}
          onSubmit={handleSubmit}
          submitLabel='Save Note'
          isSubmitting={isLoading}
        />
      </Box>
    </Box>
  );
}
