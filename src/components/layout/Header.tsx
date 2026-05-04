// App header with navigation and primary create action
import { Link } from 'react-router-dom';

import { alpha, AppBar, Box, Button, Toolbar, Typography } from '@mui/material';

import AddIcon from '@mui/icons-material/Add';

type HeaderProps = {
  onMenuClick?: () => void;
};

export default function Header({ onMenuClick }: HeaderProps) {
  return (
    <AppBar
      position='sticky'
      elevation={0}
      sx={{
        bgcolor: 'background.paper',
        color: 'text.primary',
        borderBottom: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Toolbar
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          px: { xs: 2, sm: 3 },
        }}
      >
        {/* App branding */}
        <Typography
          component={Link}
          to='/'
          variant='h6'
          sx={{
            fontWeight: 600,
            letterSpacing: 0.2,
            whiteSpace: 'nowrap',
            textDecoration: 'none',
            color: 'inherit',
          }}
        >
          <Box component='span' sx={{ color: 'primary.main', fontWeight: 700 }}>
            AI
          </Box>{' '}
          Notes App
        </Typography>
        {/* Primary action: navigate to create note */}
        <Button
          component={Link}
          to='/create'
          startIcon={<AddIcon />}
          variant='contained'
          sx={{
            px: 3,
            py: 1,
            borderRadius: 0.5,
            textTransform: 'none',
            fontWeight: 500,
            boxShadow: 'none',
            bgcolor: 'primary.main',
            '&:hover': {
              boxShadow: 'none',
              bgcolor: (theme) => alpha(theme.palette.primary.main, 0.9),
            },
          }}
        >
          New Note
        </Button>
      </Toolbar>
    </AppBar>
  );
}
