import { createContext, useState, useEffect } from "react";
import { getAllUsers, updateUser, createUser, deleteUser } from "../../services/usersApi";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      const fetchedUsers = await getAllUsers();
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

  const addUser = async (newUserData) => {
    try {
      const newUser = await createUser(newUserData);
      setUsers([...users, newUser]);
      setCurrentUserId(newUser.id);
      setCurrentUser(newUser);
      return newUser;
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  };

 const removeUser = async (userId) => {
    try {
      await deleteUser(userId);
      const updatedUsers = users.filter(user => user.id !== userId);
      setUsers([...updatedUsers]);
      if (userId === currentUserId) {
        if (updatedUsers.length > 0) {
          setCurrentUserId(updatedUsers[0].id);
          setCurrentUser(updatedUsers[0]);
        } else {
          setCurrentUserId(null);
          setCurrentUser(null);
        }
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <UserContext.Provider value={{ users, currentUser, setCurrentUserId, updateCurrentUser, addUser, removeUser }}>
      {children}
    </UserContext.Provider>
  );
};
