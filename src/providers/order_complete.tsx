"use client";
import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Slide,

  Box,
  Divider,
  IconButton,
  Typography,
} from "@mui/material";
import { QrCodeScannerRounded } from "@mui/icons-material";
import DoneIcon from '@mui/icons-material/Done';
import { MessagePayload } from "firebase/messaging";
import Image from 'next/image';
// Interface for notification context
interface NotificationContextType {
  openNotificationDialog: (value: boolean) => void;
  closeNotificationDialog: () => void;
}

// Interface for provider props
interface NotificationProviderProps {
  children: ReactNode;
}

// Interface for full screen dialog state
interface FullScreenDialogState {
  open: boolean;
  message: string;
}

// Create context
const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined
);

export const NotificationProvider: React.FC<NotificationProviderProps> = ({
  children,
}) => {
  const [notificationDialogOpen, setNotificationDialogOpen] = useState<boolean>(false);
  const [fullScreenDialog, setFullScreenDialog] =
    useState<FullScreenDialogState>({
      open: false,
      message: "",
    });
  const [currentNotification, setCurrentNotification] =
    useState<MessagePayload | null>(null);


  // Open notification dialog
  const openNotificationDialog = (value: boolean) => {
    setNotificationDialogOpen(value);
  };

  // Close notification dialog
  const closeNotificationDialog = () => {
    setNotificationDialogOpen(false);
    window.history.replaceState(null, '', '/scan-again');
    window.location.href = '/scan-again';
    // Open full-screen dialog if notification exists
    // if (currentNotification) {
    // setFullScreenDialog({
    //   open: true,
    //   message: currentNotification?.notification?.body || "No message",
    // });
    // }
  };

  // Close full-screen dialog
  const closeFullScreenDialog = () => {
    setFullScreenDialog({ open: false, message: "" });
    setCurrentNotification(null);
  };

  // Listener for tab/window focus to reset full-screen dialog
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        closeFullScreenDialog();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return (
    <NotificationContext.Provider
      value={{ openNotificationDialog, closeNotificationDialog }}
    >
      {children}

      <Dialog
        open={notificationDialogOpen}
        keepMounted
        aria-describedby="notification-dialog"
        sx={{
          '& .MuiDialog-paper': {
            width: '74%', // Set width to 70%
            paddingBottom: 2, // Add padding to the bottom of the dialog
          },
        }}
      >
        <DialogTitle>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            flexDirection="column"
            textAlign="center"
          >
            <Box
              sx={{
                padding: 2,
                marginBottom: 2
              }}
            >
              <Image
                src="/images/png/order_complete_done_icon.png"
                alt="Order Complete"
                width={80}
                height={80}
                className="object-contain"
              />
            </Box>

            <Typography variant="h6" fontWeight="600" gutterBottom>
              Order Completed
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Thank you, please visit again.
            </Typography>
          </Box>
        </DialogTitle>
        <DialogActions sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button
            onClick={closeNotificationDialog}
            variant="outlined"
            color="success"
            sx={{
              width: '70%',
              borderColor: 'green',
              color: 'green',
              fontWeight: 'bold', // Make the text bold
              boxShadow: '0 4px 6px rgba(0, 128, 0, 0.2)', // Add shadow to the button
              '&:hover': {
                backgroundColor: 'rgba(0, 128, 0, 0.1)', // Slight green hover effect
                boxShadow: '0 6px 6px rgba(0, 128, 0, 0.3)', // Darker shadow on hover
              },
            }}
            fullWidth
          >
            Done
          </Button>
        </DialogActions>
      </Dialog>

      {/* Full Screen Dialog */}
      <Dialog
        fullScreen={true}
        open={fullScreenDialog.open}
        onClose={() => { }} // Prevent closing
      >
        <DialogTitle>
          <Box display="flex" alignItems="center" justifyContent="space-between">
            <Typography variant="h6">Notification Details</Typography>
            <IconButton onClick={closeFullScreenDialog}>
              <DoneIcon color="primary" />
            </IconButton>
          </Box>
        </DialogTitle>
        <Divider />
        <DialogContent>
          <DialogContentText>
            {fullScreenDialog.message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button startIcon={<QrCodeScannerRounded />} onClick={closeFullScreenDialog} color="primary">
            Scan to Order Again
          </Button>
        </DialogActions>
      </Dialog>
    </NotificationContext.Provider>
  );
};

// Custom hook for using notification context
export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error(
      "useNotification must be used within a NotificationProvider"
    );
  }
  return context;
};
