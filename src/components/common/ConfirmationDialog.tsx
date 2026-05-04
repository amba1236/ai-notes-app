// Reusable confirmation dialog with configurable confirm action
import React from 'react';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material';

// Props to control dialog content and behavior
interface ConfirmationDialogProps {
  open: boolean;
  title: string;
  message: React.ReactNode;
  confirmText?: string;
  confirmColor?: 'primary' | 'error' | 'secondary';
  onConfirm: () => void;
  onClose: () => void;
}

export default function ConfirmationDialog({
  open,
  title,
  message,
  confirmText = 'Confirm',
  confirmColor = 'primary',
  onConfirm,
  onClose,
}: ConfirmationDialogProps) {
  return (
    <Dialog open={open} onClose={onClose} disableEscapeKeyDown>
      <DialogTitle sx={{ fontWeight: 600 }}>{title}</DialogTitle>
      <DialogContent>
        <Typography>{message}</Typography>
      </DialogContent>
      <DialogActions sx={{ p: 2 }}>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          color={confirmColor}
          variant='contained'
          autoFocus
          onClick={() => {
            onConfirm();
            onClose();
          }}
        >
          {confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
