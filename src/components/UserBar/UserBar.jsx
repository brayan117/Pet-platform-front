import { useContext } from "react";
import { UserContext } from "../../context/UserContext/UserContext";

const UserBar = () => {
  const { users, currentUser, setCurrentUserId } = useContext(UserContext);

  if (!currentUser || users.length === 0) {
    return <div className="bg-gray-100 border-b border-gray-300 p-2">Loading...</div>;
  }

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
    </div>
  );
};

export default UserBar;
