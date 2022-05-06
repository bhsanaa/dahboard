import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, {AlertProps} from "@mui/material/Alert";
import {AppContext, useAppContext} from "../provider/AppProvider";

const Alert = function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
};

export default function CustomizedSnackbars() {
  const {snackbar, changeSnackBar} = useAppContext();

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    changeSnackBar(false, "", "");
  };

  return (
    <Stack spacing={2} sx={{width: "100%"}}>
      <Snackbar
        anchorOrigin={{vertical: "top", horizontal: "right"}}
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={snackbar.severity}
          sx={{width: "100%"}}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Stack>
  );
}
