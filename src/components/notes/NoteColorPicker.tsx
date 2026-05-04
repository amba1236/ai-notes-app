// Color picker for selecting a note background
import { Box } from '@mui/material';

// Available note color options
const COLORS = [
  { name: 'yellow', value: '#FEF9C3' },
  { name: 'blue', value: '#DBEAFE' },
  { name: 'green', value: '#DCFCE7' },
  { name: 'purple', value: '#EDE9FE' },
  { name: 'grey', value: '#F1F5F9' },
  { name: 'pink', value: '#FCE7F3' },
];

export default function NoteColorPicker({
  color,
  setColor,
}: {
  color: string;
  setColor: (c: string) => void;
}) {
  return (
    <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
      {COLORS.map((c) => (
        <Box
          key={c.name}
          onClick={() => setColor(c.value)}
          sx={{
            width: 28,
            height: 28,
            borderRadius: '50%',
            cursor: 'pointer',
            backgroundColor: c.value,
            border:
              color === c.value ? '2px solid #000' : '2px solid transparent',
            transition: '0.2s',
          }}
        />
      ))}
    </Box>
  );
}
