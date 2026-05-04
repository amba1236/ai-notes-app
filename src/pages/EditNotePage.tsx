// Page for editing an existing note and handling update flow
import { useNavigate, useParams } from 'react-router-dom';

import { Box, CircularProgress, Typography } from '@mui/material';

import {
  useFetchNoteQuery,
  useFetchNotesQuery,
  useUpdateNoteMutation,
} from '../api/notesApi';

import NoteForm from '../components/notes/NoteForm';

export default function EditNotePage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: note, isLoading } = useFetchNoteQuery(id!);
  const { data: allNotes } = useFetchNotesQuery();
  const [updateNote, { isLoading: isSaving }] = useUpdateNoteMutation();

  // Show loading spinner while fetching note data
  if (isLoading)
    return (
      <Box textAlign='center' mt={4}>
        <CircularProgress />
      </Box>
    );

  // Handle missing note (invalid or deleted ID)
  if (!note) return <Typography>Note not found.</Typography>;

  // Update note with new data and refresh timestamp
  const handleSubmit = async (data: any) => {
    await updateNote({
      ...note,
      ...data,
      updatedAt: new Date().toISOString(),
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
          Edit Note
        </Typography>
        <NoteForm
          initialData={note}
          allNotes={allNotes}
          onSubmit={handleSubmit}
          submitLabel='Save Changes'
          isSubmitting={isSaving}
        />
      </Box>
    </Box>
  );
}
