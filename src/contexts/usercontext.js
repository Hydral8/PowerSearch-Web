import React from "react";

export const UserContext = React.createContext(null);

function UserContextProvider({ children }) {
  let [user, setUser] = React.useState(null);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserContextProvider;
