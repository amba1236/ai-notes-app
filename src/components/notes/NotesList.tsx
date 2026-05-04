// Displays notes with search, sorting, and actions (pin, favourite, edit, delete)
import { useState } from 'react';

import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import {
  Box,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Typography,
} from '@mui/material';

import Grid from '@mui/material/Grid';

import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import PushPinIcon from '@mui/icons-material/PushPin';
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';

import { Note } from '../../types/note';

import {
  useDeleteNoteMutation,
  useFetchNotesQuery,
  useUpdateNoteMutation,
} from '../../api/notesApi';

import ConfirmationDialog from '../common/ConfirmationDialog';

export default function NotesList({
  notesOverride,
}: {
  notesOverride?: Note[];
}) {
  const { data: fetchedNotes, isLoading, isError } = useFetchNotesQuery();
  const [updateNote] = useUpdateNoteMutation();
  const [deleteNote] = useDeleteNoteMutation();

  const navigate = useNavigate();

  const [openConfirm, setOpenConfirm] = useState(false);
  const [noteToDelete, setNoteToDelete] = useState<Note | null>(null);

  const notes = notesOverride ?? fetchedNotes;

  const searchQuery = useSelector((state: any) =>
    state.search.query.toLowerCase(),
  );

  // Loading and error states
  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    return <Typography color='error'>Failed to load notes.</Typography>;
  }

  // Filter notes by title, content, or tags
  const filteredNotes = notes?.filter((note) => {
    const title = note.title.toLowerCase();
    const content = note.content.toLowerCase();
    const tags = note.tags?.join(' ').toLowerCase() || '';
    return (
      title.includes(searchQuery) ||
      content.includes(searchQuery) ||
      tags.includes(searchQuery)
    );
  });

  // Sort pinned notes to appear first
  const sortedNotes = filteredNotes?.slice().sort((a, b) => {
    return (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0);
  });

  const handleOpenDelete = (note: Note) => {
    setNoteToDelete(note);
    setOpenConfirm(true);
  };

  const handleConfirmDelete = async () => {
    if (noteToDelete) {
      await deleteNote(noteToDelete.id!.toString());
    }
  };

  // Highlight search matches in preview text
  function highlightText(text: string, query: string) {
    if (!query) return text;

    const regex = new RegExp(`(${query})`, 'gi');
    return text.replace(
      regex,
      `<mark style="background:#ffeb3b; padding:0 2px;">$1</mark>`,
    );
  }

  return (
    <>
      <ConfirmationDialog
        open={openConfirm}
        title='Delete Note?'
        message={
          <>
            Are you sure you want to delete{' '}
            <Typography
              component='span'
              variant='subtitle2'
              sx={{ fontSize: '16px', fontWeight: 500, color: '#0EA5E9' }}
            >
              {noteToDelete?.title}
            </Typography>
            ?
          </>
        }
        confirmText='Delete'
        confirmColor='error'
        onConfirm={handleConfirmDelete}
        onClose={() => setOpenConfirm(false)}
      />
      <Grid container spacing={3}>
        {sortedNotes?.map((note) => (
          <Grid key={note.id} size={{ xs: 12, md: 6 }}>
            <Card
              component={Link}
              to={`/note/${note.id}`}
              sx={{
                position: 'relative',
                textDecoration: 'none',
                borderRadius: '20px',
                p: 3,
                height: '100%',
                boxShadow: '0 6px 14px rgba(0,0,0,0.08)',
                bgcolor: note.color || 'white',
                transition: '0.2s',
                display: 'block',
                '&:hover': {
                  boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
                },
              }}
            >
              {/* Toggle pin */}
              <Box sx={{ position: 'absolute', top: 14, left: 14 }}>
                {note.pinned ? (
                  <PushPinIcon
                    sx={{ color: '#0EA5E9', cursor: 'pointer' }}
                    onClick={(e) => {
                      e.preventDefault();
                      updateNote({ ...note, pinned: false });
                    }}
                  />
                ) : (
                  <PushPinOutlinedIcon
                    sx={{ color: '#94A3B8', cursor: 'pointer' }}
                    onClick={(e) => {
                      e.preventDefault();
                      updateNote({ ...note, pinned: true });
                    }}
                  />
                )}
              </Box>
              {/* Toggle favourite */}
              <Box sx={{ position: 'absolute', top: 14, right: 80 }}>
                {note.favorite ? (
                  <StarIcon
                    sx={{ color: '#FACC15', cursor: 'pointer' }}
                    onClick={(e) => {
                      e.preventDefault();
                      updateNote({ ...note, favorite: false });
                    }}
                  />
                ) : (
                  <StarBorderIcon
                    sx={{ color: '#94A3B8', cursor: 'pointer' }}
                    onClick={(e) => {
                      e.preventDefault();
                      updateNote({ ...note, favorite: true });
                    }}
                  />
                )}
              </Box>
              {/* Navigate to edit */}
              <Box sx={{ position: 'absolute', top: 14, right: 46 }}>
                <EditOutlinedIcon
                  sx={{
                    color: '#94A3B8',
                    cursor: 'pointer',
                    fontSize: 22,
                    '&:hover': { color: '#0EA5E9' },
                  }}
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(`/note/${note.id}`);
                  }}
                />
              </Box>
              {/* Trigger delete confirmation */}
              <Box sx={{ position: 'absolute', top: 14, right: 14 }}>
                <DeleteOutlineIcon
                  sx={{
                    color: '#94A3B8',
                    cursor: 'pointer',
                    fontSize: 22,
                    '&:hover': { color: '#dc2626' },
                  }}
                  onClick={(e) => {
                    e.preventDefault();
                    handleOpenDelete(note);
                  }}
                />
              </Box>
              <CardContent sx={{ pt: 4 }}>
                <Typography
                  variant='h6'
                  sx={{
                    fontWeight: 700,
                    mb: 1,
                    color: '#0F172A',
                    lineHeight: 1.3,
                  }}
                >
                  {note.title}
                </Typography>
                <Box
                  sx={{
                    mb: 2,
                    color: '#64748B',
                    fontSize: '0.9rem',
                    lineHeight: 1.5,
                  }}
                  dangerouslySetInnerHTML={{
                    __html: highlightText(
                      (note.content?.substring(0, 150) || '') + '...',
                      searchQuery,
                    ),
                  }}
                />
                <Box
                  sx={{
                    mb: 2,
                    display: 'flex',
                    gap: 1,
                    flexWrap: 'wrap',
                  }}
                >
                  {note.tags?.map((tag) => (
                    <Chip key={tag} label={tag} size='small' />
                  ))}
                </Box>
                <Typography variant='caption' sx={{ color: '#94A3B8' }}>
                  Updated {new Date(note.updatedAt).toLocaleDateString('en-GB')}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
}
