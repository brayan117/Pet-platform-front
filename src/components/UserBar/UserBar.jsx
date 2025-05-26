import { useContext, useState } from "react";
import { UserContext } from "../../context/UserContext/UserContext";

const UserBar = () => {
  const { users, currentUser, setCurrentUserId, addUser, removeUser } =
    useContext(UserContext);
  const [newUserName, setNewUserName] = useState("");
  const [message, setMessage] = useState("");

  const handleAddUser = async () => {
    debugger
    if (!newUserName.trim()) return;

    const newUser = await addUser({ nombre: newUserName });
    setNewUserName("");
    setCurrentUserId(newUser.id);
    setMessage("✅ Usuario creado correctamente");

    setTimeout(() => setMessage(""), 3000);
  };

  const handleDeleteUser = async () => {
    if (!currentUser) return;
    debugger
    await removeUser(currentUser.id);
    setMessage("🗑️ Usuario eliminado correctamente");

    setTimeout(() => setMessage(""), 3000);
  };

  if (!currentUser || users.length === 0) {
    return (
      <div className="bg-gray-100 border-b border-gray-300 p-2">
        Cargando usuarios...
      </div>
    );
  }

  return (
    <div className="bg-gray-100 border-b border-gray-300 p-3 flex flex-wrap items-center gap-2">
      <select
        value={currentUser.id}
        onChange={(e) => setCurrentUserId(e.target.value)}
        className="text-sm px-2 py-1 rounded border border-gray-300 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        {users.map((user) => (
          <option key={user.id} value={user.id}>
            {user.nombre}
          </option>
        ))}
      </select>

      <input
        type="text"
        placeholder="Nuevo usuario"
        value={newUserName}
        onChange={(e) => setNewUserName(e.target.value)}
        className="text-sm px-2 py-1 rounded border border-gray-300 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <button
        onClick={handleAddUser}
        disabled={!newUserName.trim()}
        className={`text-sm font-semibold py-1 px-3 rounded transition-colors ${
          newUserName.trim()
            ? "bg-green-500 hover:bg-green-600 text-white"
            : "bg-gray-300 text-gray-500 cursor-not-allowed"
        }`}
      >
        Agregar
      </button>

      <button
        onClick={handleDeleteUser}
        disabled={!currentUser}
        className={`text-sm font-semibold py-1 px-3 rounded transition-colors ${
          currentUser
            ? "bg-red-500 hover:bg-red-600 text-white"
            : "bg-gray-300 text-gray-500 cursor-not-allowed"
        }`}
      >
        Eliminar
      </button>

      {message && (
        <span className="text-sm text-blue-700 font-medium ml-4 animate-fade-in">
          {message}
        </span>
      )}
    </div>
  );
};

export default UserBar;
