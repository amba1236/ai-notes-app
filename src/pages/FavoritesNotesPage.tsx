import { Box, Typography } from '@mui/material';

import { useFetchNotesQuery } from '../api/notesApi';

import NotesList from '../components/notes/NotesList';

export default function FavoritesNotesPage() {
  const { data: notes } = useFetchNotesQuery();

  // Filter notes to only include favourites
  const favouriteNotes = notes?.filter((n) => n.favorite);

  return (
    <Box>
      <Typography variant='h5' sx={{ mb: 3, fontWeight: 600 }}>
        Favourite Notes
      </Typography>
      <NotesList notesOverride={favouriteNotes} />
    </Box>
  );
}
