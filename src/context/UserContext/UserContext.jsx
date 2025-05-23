import { createContext, useState, useEffect } from "react";
import { getAllUsers, updateUser } from "../../services/usersApi";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      //console('Llamando usuarios');
      const fetchedUsers = await getAllUsers();
      //console(fetchUsers);
      setUsers(fetchedUsers);
      if (fetchedUsers.length > 0) {
        setCurrentUserId(fetchedUsers[0].id);
        setCurrentUser(fetchedUsers[0]);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    if (currentUserId) {
      const foundUser = users.find((user) => user.id === currentUserId);
      setCurrentUser(foundUser);
    }
  }, [currentUserId, users]);

  const updateCurrentUser = async (updatedUser) => {
    try {
      await updateUser(updatedUser.id, updatedUser);
      setUsers(users.map(user => user.id === updatedUser.id ? updatedUser : user));
      setCurrentUser(updatedUser);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <UserContext.Provider value={{ users, currentUser, setCurrentUserId, updateCurrentUser }}>
      {children}
    </UserContext.Provider>
  );
};
