// App header with navigation and primary create action
import { Link } from 'react-router-dom';

import {
  alpha,
  AppBar,
  Box,
  Button,
  Toolbar,
  Typography,
  IconButton,
} from '@mui/material';

import AddIcon from '@mui/icons-material/Add';
import MenuIcon from '@mui/icons-material/Menu';

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
        {/* LEFT SIDE: menu + logo */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {/* Mobile menu button */}
          <IconButton
            onClick={onMenuClick}
            sx={{ display: { md: 'none' }, mr: 1 }}
          >
            <MenuIcon />
          </IconButton>
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
            <Box
              component='span'
              sx={{ color: 'primary.main', fontWeight: 700 }}
            >
              AI
            </Box>{' '}
            Notes App
          </Typography>
        </Box>
        {/* RIGHT SIDE: action button */}
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
