import React from "react";

const Context = React.createContext(null);

const initialState = {
  open: false,
  message: "",
  severity: "success",
};

function SnackbarContext({ children }) {
  let [snack, setSnack] = React.useState(initialState);
  return (
    <SnackContext.Provider value={{ snack, setSnack }}>
      {children}
    </SnackContext.Provider>
  );
}

export const SnackContext = React.createContext(initialState);

export default SnackbarContext;
