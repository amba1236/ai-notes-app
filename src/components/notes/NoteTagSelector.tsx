// Handles selecting, adding, and suggesting tags for a note
import { useState } from 'react';

import { Box, Chip, Paper, Stack, TextField, Typography } from '@mui/material';

import { Note } from '../../types/note';

interface NoteTagSelectorProps {
  allNotes: Note[] | undefined;
  tags: string[];
  setTags: (tags: string[]) => void;
}

export default function NoteTagSelector({
  allNotes,
  tags,
  setTags,
}: NoteTagSelectorProps) {
  const [tagInput, setTagInput] = useState('');

  // Extract unique tags from all notes (used for suggestions)
  const allExistingTags =
    allNotes
      ?.flatMap((n) => n.tags || [])
      .filter((tag, idx, arr) => arr.indexOf(tag) === idx) || [];

  // Filter suggestions based on input and exclude already selected tags
  const suggestions = allExistingTags.filter(
    (t) =>
      t.toLowerCase().includes(tagInput.toLowerCase()) && !tags.includes(t),
  );

  // Add new tag from input if valid and not already selected
  const handleAddTag = () => {
    const clean = tagInput.trim();
    if (clean && !tags.includes(clean)) {
      setTags([...tags, clean]);
    }
    setTagInput('');
  };

  // Allow adding tag via Enter key
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };

  // Remove tag from selected list
  const removeTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  return (
    <Box>
      <TextField
        placeholder='Add a tag'
        fullWidth
        value={tagInput}
        onChange={(e) => setTagInput(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      {suggestions.length > 0 && (
        <Paper
          sx={{
            mt: 1,
            p: 1,
            borderRadius: '12px',
            boxShadow: '0 4px 10px rgba(0,0,0,0.08)',
          }}
        >
          <Typography variant='body2' sx={{ mb: 1, color: '#475569' }}>
            Suggestions
          </Typography>
          <Stack direction='row' spacing={1} flexWrap='wrap' gap={1}>
            {suggestions.map((tag) => (
              <Chip
                key={tag}
                label={tag}
                onClick={() => {
                  setTags([...tags, tag]);
                  setTagInput('');
                }}
                sx={{
                  bgcolor: '#EFF6FF',
                  color: '#3B82F6',
                  cursor: 'pointer',
                }}
              />
            ))}
          </Stack>
        </Paper>
      )}
      <Stack direction='row' spacing={1} mt={2} flexWrap='wrap'>
        {tags.map((tag) => (
          <Chip key={tag} label={tag} onDelete={() => removeTag(tag)} />
        ))}
      </Stack>
    </Box>
  );
}
