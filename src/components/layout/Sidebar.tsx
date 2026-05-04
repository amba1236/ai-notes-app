// Responsive sidebar with collapse state, navigation, and search
import { useState } from 'react';

import { useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

import {
  alpha,
  Box,
  Drawer,
  IconButton,
  InputAdornment,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  TextField,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';

import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import LabelOutlinedIcon from '@mui/icons-material/LabelOutlined';
import NoteOutlinedIcon from '@mui/icons-material/NoteOutlined';
import SearchIcon from '@mui/icons-material/Search';
import StarBorderIcon from '@mui/icons-material/StarBorder';

import { setSearchQuery } from '../../store/searchSlice';

const drawerWidth = 260;
const collapsedWidth = 72;

// Sidebar navigation items
const menuItems = [
  { label: 'Notes', path: '/', icon: <NoteOutlinedIcon /> },
  { label: 'Favourites', path: '/favorites', icon: <StarBorderIcon /> },
  { label: 'Tags', path: '/tags', icon: <LabelOutlinedIcon /> },
];

type SidebarProps = {
  mobileOpen: boolean;
  onToggle: () => void;
};

export default function Sidebar({ mobileOpen, onToggle }: SidebarProps) {
  const location = useLocation();
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [collapsed, setCollapsed] = useState(false);

  // Check if a route is currently active
  const isActive = (path: string) => location.pathname === path;

  // Dynamically adjust sidebar width based on collapse state
  const sidebarWidth = collapsed ? collapsedWidth : drawerWidth;

  // Drawer content extracted for reuse between mobile and desktop variants
  const drawerContent = (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: alpha(theme.palette.background.paper, 0.85),
        backdropFilter: 'blur(10px)',
        borderRight: `1px solid ${theme.palette.divider}`,
        transition: theme.transitions.create(['width'], {
          duration: theme.transitions.duration.standard,
        }),
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: collapsed ? 'center' : 'space-between',
          px: collapsed ? 1 : 2,
          py: 2,
        }}
      >
        {!collapsed && (
          <Typography
            variant='caption'
            sx={{
              fontWeight: 600,
              letterSpacing: 1,
              color: 'text.secondary',
              textTransform: 'uppercase',
            }}
          >
            Menu
          </Typography>
        )}

        {/* Toggle collapse state */}
        <IconButton
          onClick={() => setCollapsed((prev) => !prev)}
          size='small'
          sx={{
            transition: 'transform 0.2s ease',
            transform: collapsed ? 'rotate(180deg)' : 'rotate(0deg)',
          }}
        >
          <ChevronLeftIcon />
        </IconButton>
      </Box>
      {/* Dispatch search input to global state */}
      {!collapsed && (
        <Box sx={{ px: 2, pb: 2, borderRadius: 0 }}>
          <TextField
            size='small'
            fullWidth
            placeholder='Search notes'
            onChange={(e) => dispatch(setSearchQuery(e.target.value))}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <SearchIcon fontSize='small' />
                </InputAdornment>
              ),
            }}
          />
        </Box>
      )}
      <List sx={{ px: 1 }}>
        {menuItems.map((item) => {
          const active = isActive(item.path);
          const button = (
            <ListItemButton
              key={item.path}
              component={Link}
              to={item.path}
              onClick={isMobile ? onToggle : undefined} // close drawer on mobile navigation
              sx={{
                position: 'relative',
                minHeight: 44,
                borderRadius: 2,
                mb: 0.6,
                justifyContent: collapsed ? 'center' : 'flex-start',
                color: active
                  ? theme.palette.primary.main
                  : theme.palette.text.secondary,
                bgcolor: active
                  ? alpha(theme.palette.primary.main, 0.12)
                  : 'transparent',
                transition: 'all 0.15s ease',
                '&:hover': {
                  bgcolor: alpha(theme.palette.primary.main, 0.1),
                  transform: 'translateX(2px)',
                },
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: collapsed ? 0 : 2,
                  justifyContent: 'center',
                  color: 'inherit',
                }}
              >
                {item.icon}
              </ListItemIcon>

              {!collapsed && (
                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{
                    fontWeight: active ? 600 : 400,
                  }}
                />
              )}
            </ListItemButton>
          );

          return collapsed ? (
            <Tooltip
              key={item.path}
              title={item.label}
              placement='right'
              enterDelay={200}
            >
              {button}
            </Tooltip>
          ) : (
            button
          );
        })}
      </List>
    </Box>
  );

  return (
    <Drawer
      variant={isMobile ? 'temporary' : 'permanent'}
      open={isMobile ? mobileOpen : true}
      onClose={onToggle}
      ModalProps={{ keepMounted: true }} // improves mobile performance
      sx={{
        width: sidebarWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: sidebarWidth,
          boxSizing: 'border-box',
          overflowX: 'hidden',
          transition: theme.transitions.create(['width'], {
            duration: theme.transitions.duration.standard,
          }),
        },
      }}
    >
      {drawerContent}
    </Drawer>
  );
}
