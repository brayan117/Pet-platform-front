import { createContext, useState, useEffect } from "react";
import users from "../../data/users";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [currentUserId, setCurrentUserId] = useState(() => {
    // Al refrescar la pagina se va a mantener el usuario en el que se estaba (Hotfix)
    const storedId = localStorage.getItem("currentUserId");
    return storedId ? storedId : users[0].id;
  });

  useEffect(() => {
    localStorage.setItem("currentUserId", currentUserId);
  }, [currentUserId]);

  const currentUser = users.find((user) => user.id === currentUserId);

  return (
    <UserContext.Provider value={{ users, currentUser, setCurrentUserId }}>
      {children}
    </UserContext.Provider>
  );
};
