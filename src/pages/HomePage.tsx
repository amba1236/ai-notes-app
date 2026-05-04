// Home page displaying all notes. 
import { Box } from '@mui/material';

import NotesList from '../components/notes/NotesList';

export default function HomePage() {
  return (
    <Box sx={{ mt: 2 }}>
      <NotesList />
    </Box>
  );
}
