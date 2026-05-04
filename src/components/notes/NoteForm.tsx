import { useEffect, useState } from 'react';

import {
  Box,
  Button,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

import ColorPicker from './NoteColorPicker';
import RichTextEditor from '../editor/RichTextEditor';
import TagSelector from './NoteTagSelector';

import { generateAISummary } from '../../api/mockAI';

interface NoteFormProps {
  initialData?: {
    title: string;
    content?: string;
    tags?: string[];
    summary?: string;
    color?: string;
  };
  allNotes?: any[];
  onSubmit: (data: any) => void;
  isSubmitting?: boolean;
  submitLabel: string;
}

export default function NoteForm({
  initialData,
  allNotes,
  onSubmit,
  isSubmitting,
  submitLabel,
}: NoteFormProps) {
  const [title, setTitle] = useState(initialData?.title || '');
  const [content, setContent] = useState(initialData?.content || '');
  const [tags, setTags] = useState<string[]>(initialData?.tags || []);
  const [summary, setSummary] = useState(initialData?.summary || '');
  const [color, setColor] = useState(initialData?.color || '#F1F5F9');

  const [isSummarizing, setIsSummarizing] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Sync form state when editing existing note
  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || '');
      setContent(initialData.content || '');
      setTags(initialData.tags || []);
      setSummary(initialData.summary || '');
      setColor(initialData.color || '#F1F5F9');
    }
  }, [initialData]);

  // Check if rich text content is effectively empty (ignores HTML tags)
  const isEmptyContent = (value: string) => {
    if (!value) return true;

    const stripped = value
      .replace(/<[^>]*>/g, '')
      .replace(/&nbsp;/g, '')
      .trim();

    return stripped.length === 0;
  };

  // Generate AI summary from note content
  const handleGenerateSummary = async () => {
    if (isEmptyContent(content)) return;

    setIsSummarizing(true);
    const result = await generateAISummary(content);
    setSummary(result);
    setIsSummarizing(false);
  };

  // Validate and submit form data
  const handleSubmit = async () => {
    setSubmitted(true);

    if (!title.trim()) return;

    let finalSummary = summary;

    // Auto-generate summary if missing but content exists
    if (!finalSummary && !isEmptyContent(content)) {
      finalSummary = await generateAISummary(content);
      setSummary(finalSummary);
    }

    onSubmit({
      title,
      content,
      tags,
      summary: finalSummary,
      color,
    });
  };

  return (
    <Stack spacing={3}>
      <Paper elevation={0} sx={{ p: 3 }}>
        <Typography variant='subtitle2' sx={{ mb: 1, color: '#475569' }}>
          Title
        </Typography>
        <TextField
          placeholder='Enter note title'
          fullWidth
          value={title}
          required
          error={submitted && !title.trim()}
          helperText={submitted && !title.trim() ? 'Please enter a title' : ''}
          onChange={(e) => setTitle(e.target.value)}
        />
      </Paper>
      <Paper elevation={0} sx={{ p: 3 }}>
        <Typography variant='subtitle2' sx={{ mb: 2, color: '#475569' }}>
          Note Content
        </Typography>
        <RichTextEditor content={content} onChange={setContent} />
      </Paper>
      <Paper elevation={0} sx={{ p: 3 }}>
        <Typography variant='subtitle2' sx={{ mb: 2, color: '#475569' }}>
          Tags
        </Typography>
        <TagSelector allNotes={allNotes} tags={tags} setTags={setTags} />
      </Paper>
      <Paper elevation={0} sx={{ p: 3 }}>
        <Typography variant='subtitle2' sx={{ mb: 2, color: '#475569' }}>
          Note Colour
        </Typography>
        <ColorPicker color={color} setColor={setColor} />
      </Paper>
      <Paper elevation={0} sx={{ p: 3 }}>
        <Stack direction='row' justifyContent='space-between' mb={2}>
          <Typography variant='subtitle2' sx={{ color: '#475569' }}>
            AI Summary
          </Typography>
          <Button
            variant='outlined'
            size='small'
            onClick={handleGenerateSummary}
            disabled={isSummarizing || isEmptyContent(content)}
            sx={{ borderRadius: 0.5 }}
          >
            {isSummarizing ? 'Generating...' : 'Generate'}
          </Button>
        </Stack>
        {summary ? (
          <Box
            sx={{
              p: 2,
              borderRadius: 1,
              bgcolor: '#F8FAFC',
              border: '1px solid #E2E8F0',
            }}
          >
            <Typography variant='body2' sx={{ color: '#334155' }}>
              {summary}
            </Typography>
          </Box>
        ) : (
          <Typography variant='body2' sx={{ color: '#94A3B8' }}>
            No summary yet
          </Typography>
        )}
      </Paper>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          gap: 2,
          mt: 1,
        }}
      >
        <Button
          variant='contained'
          disabled={isSubmitting}
          onClick={handleSubmit}
          sx={{
            px: 4,
            py: 1.2,
            borderRadius: 0.5,
            textTransform: 'none',
            fontWeight: 500,
          }}
        >
          {submitLabel}
        </Button>
      </Box>
    </Stack>
  );
}
