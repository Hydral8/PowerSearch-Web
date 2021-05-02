import React, { useContext } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { SnackContext } from "../contexts/snackbarcontext";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
function LiveSnackBar() {
  let { snack, setSnack } = useContext(SnackContext);
  return (
    <Snackbar
      open={snack.open}
      autoHideDuration={5000}
      onClose={() =>
        setSnack({
          open: false,
          message: "",
          severity: "success",
        })
      }
    >
      <Alert severity={snack.severity}>{snack.message}</Alert>
    </Snackbar>
  );
}

export default LiveSnackBar;
