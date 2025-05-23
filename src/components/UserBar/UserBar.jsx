import { useContext, useState } from "react";
import { UserContext } from "../../context/UserContext/UserContext";

const UserBar = () => {
  const { users, currentUser, setCurrentUserId, addUser, removeUser } = useContext(UserContext);
  const [newUserName, setNewUserName] = useState("");

  if (!currentUser || users.length === 0) {
    return <div className="bg-gray-100 border-b border-gray-300 p-2">Loading...</div>;
  }

  const handleAddUser = async () => {
    if (newUserName) {
      const newUser = await addUser({ nombre: newUserName });
      setNewUserName("");
      setCurrentUserId(newUser.id);
      setTimeout(() => {
        alert("Usuario creado correctamente!");
        window.location.reload();
      }, 750);
    }
  };

  const handleDeleteUser = () => {
    if (currentUser) {
      removeUser(currentUser.id);
    }
  };

  return (
    <div className="bg-gray-100 border-b border-gray-300 p-2 flex place-items-end">
      <select
        value={currentUser.id}
        onChange={(e) => setCurrentUserId(e.target.value)}
        className="text-xs px-2 py-1 rounded border border-gray-300 bg-white text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-400"
        style={{ maxWidth: 160 }}
      >
        {users.map((user) => (
          <option key={user.id} value={user.id}>
            {user.nombre}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Nombre del nuevo usuario"
        value={newUserName}
        onChange={(e) => setNewUserName(e.target.value)}
        className="text-xs px-2 py-1 rounded border border-gray-300 bg-white text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-400 ml-2"
      />
      <button
        onClick={handleAddUser}
        className="bg-green-500 hover:bg-green-700 text-white text-xs font-bold py-1 px-2 rounded ml-2"
      >
        Agregar Usuario
      </button>
      <button
        onClick={handleDeleteUser}
        className="bg-red-500 hover:bg-red-700 text-white text-xs font-bold py-1 px-2 rounded ml-2"
      >
        Eliminar Usuario
      </button>
    </div>
  );
};

export default UserBar;
