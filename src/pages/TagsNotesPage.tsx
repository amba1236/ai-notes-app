import { useMemo, useState } from 'react';

import { Box, Chip, Divider, Stack, Typography } from '@mui/material';

import { useFetchNotesQuery } from '../api/notesApi';
import NotesList from '../components/notes/NotesList';

export default function TagsNotesPage() {
  const { data: notes } = useFetchNotesQuery();

  // Show all tagged notes by default
  const [selectedTag, setSelectedTag] = useState<string>('all');

  // Get all unique tags from notes and sort them
  const allTags = useMemo(() => {
    if (!notes) return [];
    return Array.from(new Set(notes.flatMap((n) => n.tags || []))).sort();
  }, [notes]);

  // Filter notes based on selected tag
  // "All" shows only notes that actually have tags
  const filteredNotes =
    notes?.filter((n) => {
      if (selectedTag === 'all') {
        return n.tags && n.tags.length > 0;
      }
      return n.tags?.includes(selectedTag);
    }) || [];

  const hasTags = allTags.length > 0;

  return (
    <Box sx={{ p: 1 }}>
      {/* TAG FILTER BAR */}
      <Stack direction='row' flexWrap='wrap' spacing={1} sx={{ mb: 3 }}>
        {/* Empty state when no tags exist */}
        {!hasTags && (
          <Typography color='text.secondary' sx={{ fontStyle: 'italic' }}>
            No tags found. Add tags to your notes.
          </Typography>
        )}
        {/* "All" filter - resets view to all tagged notes */}
        {hasTags && (
          <Chip
            label='All'
            clickable
            onClick={() => setSelectedTag('all')}
            sx={{
              borderRadius: 1,
              fontWeight: selectedTag === 'all' ? 600 : 400,
              bgcolor: selectedTag === 'all' ? 'primary.main' : 'grey.100',
              color: selectedTag === 'all' ? 'white' : 'text.primary',
              '&:hover': {
                bgcolor: selectedTag === 'all' ? 'primary.dark' : 'grey.200',
              },
            }}
          />
        )}

        {/* Individual tag filters */}
        {allTags.map((tag) => {
          const active = tag === selectedTag;

          return (
            <Chip
              key={tag}
              label={tag}
              clickable
              onClick={() => setSelectedTag(tag)}
              sx={{
                borderRadius: 1,
                fontWeight: active ? 600 : 400,
                bgcolor: active ? 'primary.main' : 'grey.100',
                color: active ? 'white' : 'text.primary',
                '&:hover': {
                  bgcolor: active ? 'primary.dark' : 'grey.200',
                },
              }}
            />
          );
        })}
      </Stack>
      {/* HEADER showing current filter context */}
      {hasTags && (
        <>
          <Divider sx={{ mb: 2 }} />
          <Typography variant='h6' sx={{ mb: 2, fontWeight: 600 }}>
            {selectedTag === 'all' ? (
              'All tagged notes'
            ) : (
              <>
                Tagged:{' '}
                <Box component='span' sx={{ color: 'primary.main' }}>
                  {selectedTag}
                </Box>
              </>
            )}
          </Typography>
        </>
      )}
      {/* NOTES LIST */}
      <NotesList notesOverride={filteredNotes} />
    </Box>
  );
}
