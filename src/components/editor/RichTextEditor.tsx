// Rich text editor using TipTap with basic formatting toolbar
import { useEffect } from 'react';

import { EditorContent, useEditor } from '@tiptap/react';
import Placeholder from '@tiptap/extension-placeholder';
import StarterKit from '@tiptap/starter-kit';

import { Box, Divider, IconButton, Stack, Tooltip } from '@mui/material';

import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';

interface Props {
  content: string;
  onChange: (value: string) => void;
}

export default function RichTextEditor({ content, onChange }: Props) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: 'Write your note...',
      }),
    ],
    content,
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
  });

  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  if (!editor) return null;

  const isActive = (type: string) => editor.isActive(type);

  return (
    <Box>
      {/* TOOLBAR */}
      <Stack
        direction='row'
        spacing={1}
        alignItems='center'
        sx={{
          mb: 1.5,
          p: 1,
          borderRadius: 2,
          bgcolor: '#F8FAFC',
          border: '1px solid #E2E8F0',
        }}
      >
        <Tooltip title='Bold'>
          <IconButton
            size='small'
            onClick={() => editor.chain().focus().toggleBold().run()}
            sx={{
              bgcolor: isActive('bold') ? '#E0F2FE' : 'transparent',
            }}
          >
            <FormatBoldIcon fontSize='small' />
          </IconButton>
        </Tooltip>
        <Tooltip title='Italic'>
          <IconButton
            size='small'
            onClick={() => editor.chain().focus().toggleItalic().run()}
            sx={{
              bgcolor: isActive('italic') ? '#E0F2FE' : 'transparent',
            }}
          >
            <FormatItalicIcon fontSize='small' />
          </IconButton>
        </Tooltip>
        <Divider orientation='vertical' flexItem />
        <Tooltip title='Bullet List'>
          <IconButton
            size='small'
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            sx={{
              bgcolor: isActive('bulletList') ? '#E0F2FE' : 'transparent',
            }}
          >
            <FormatListBulletedIcon fontSize='small' />
          </IconButton>
        </Tooltip>
        <Tooltip title='Numbered List'>
          <IconButton
            size='small'
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            sx={{
              bgcolor: isActive('orderedList') ? '#E0F2FE' : 'transparent',
            }}
          >
            <FormatListNumberedIcon fontSize='small' />
          </IconButton>
        </Tooltip>
      </Stack>
      {/* EDITOR */}
      <Box
        sx={{
          border: '1px solid #E2E8F0',
          borderRadius: 2,
          p: 2,
          minHeight: '200px',
          bgcolor: '#FFFFFF',
          transition: 'all 0.2s ease',

          '&:focus-within': {
            borderColor: '#0EA5E9',
            boxShadow: '0 0 0 2px rgba(14,165,233,0.2)',
          },

          '& .ProseMirror': {
            outline: 'none',
            minHeight: '160px',
            fontSize: '0.95rem',
            color: '#0F172A',
          },

          '& .ProseMirror p': {
            margin: 0,
          },

          '& .ProseMirror ul': {
            paddingLeft: '1.2rem',
          },

          '& .ProseMirror ol': {
            paddingLeft: '1.2rem',
          },

          '& .ProseMirror li': {
            marginBottom: '4px',
          },
        }}
      >
        <EditorContent editor={editor} />
      </Box>
    </Box>
  );
}
