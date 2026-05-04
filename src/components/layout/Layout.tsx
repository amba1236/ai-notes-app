// App layout wrapper: includes Sidebar, Header, and main content area.
import { useState } from 'react';

import { Box } from '@mui/material';

import Header from './Header';
import Sidebar from './Sidebar';

export default function Layout({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleToggle = () => {
    setMobileOpen((prev) => !prev);
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {/* SIDEBAR */}
      <Sidebar mobileOpen={mobileOpen} onToggle={handleToggle} />
      {/* MAIN AREA */}
      <Box
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          minWidth: 0,
        }}
      >
        {/* HEADER */}
        <Header onMenuClick={handleToggle} />
        {/* PAGE CONTENT */}
        <Box
          component='main'
          sx={{
            flexGrow: 1,
            p: { xs: 2, sm: 3, md: 4 },
            bgcolor: 'background.default',
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
}
