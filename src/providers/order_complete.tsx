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
import {Done, DoneOutline,QrCodeScannerRounded} from "@mui/icons-material"
import { TransitionProps } from "@mui/material/transitions";
import {  onMessage, MessagePayload } from "firebase/messaging";
import { app, getMessagingFun, requestNotificationPermission } from "../../firebase-config";
import { MenuDataContext } from "@/context/menu.context";
import admin, { messaging } from "firebase-admin";
import enviroment from "../../firebase-admin-config.dev.json"
import prodEnviroment from "../../firebase-admin-config.prod.json"


// Slide transition for dialog
const Transition = React.forwardRef<unknown, TransitionProps>((props, ref) => (
  <Slide direction="up" ref={ref} {...props}>
    {props.children as any}
  </Slide>
));

// Interface for notification context
interface NotificationContextType {
  openNotificationDialog: () => void;
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
    const { deviceId } = useContext(MenuDataContext);
  const [notificationDialogOpen, setNotificationDialogOpen] = useState(false);
  const [fullScreenDialog, setFullScreenDialog] =
    useState<FullScreenDialogState>({
      open: false,
      message: "",
    });
  const [currentNotification, setCurrentNotification] =
    useState<MessagePayload | null>(null);


  // Open notification dialog
  const openNotificationDialog = () => {
    // setCurrentNotification(payload);
    setNotificationDialogOpen(true);
  };

  // Close notification dialog
  const closeNotificationDialog = () => {
    setNotificationDialogOpen(false);

    // Open full-screen dialog if notification exists
    if (currentNotification) {
      setFullScreenDialog({
        open: true,
        message: currentNotification.notification?.body || "No message",
      });
    }
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
        TransitionComponent={Transition}
        keepMounted
        // onClose={() => setNotificationDialogOpen(false)}
        aria-describedby="notification-dialog"
      >
        <DialogTitle>
          <Box display="flex" alignItems="center" justifyContent="space-between">
            <Typography variant="h6">Order Completed</Typography>
            {/* <IconButton onClick={() => setNotificationDialogOpen(false)}> */}
              <DoneOutline color="primary" />
            {/* </IconButton> */}
          </Box>
        </DialogTitle>
        <Divider />
        <DialogContent>
          <DialogContentText id="notification-dialog">
            {currentNotification?.notification?.body || 'You have a new notification'}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeNotificationDialog} color="primary">
            View Details
          </Button>
        </DialogActions>
      </Dialog>

      {/* Full Screen Dialog */}
      <Dialog
        fullScreen={true}
        open={fullScreenDialog.open}
        onClose={() => {}} // Prevent closing
        TransitionComponent={Transition}
      >
        <DialogTitle>
          <Box display="flex" alignItems="center" justifyContent="space-between">
            <Typography variant="h6">Notification Details</Typography>
            <IconButton onClick={closeFullScreenDialog}>
              <DoneOutline color="primary" />
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
