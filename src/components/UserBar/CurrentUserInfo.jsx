import { useContext } from "react";
import { UserContext } from "../../context/UserContext/UserContext";
import SimpleLoader from "../Loader/SimpleLoader";

const CurrentUserInfo = () => {
  const { currentUser } = useContext(UserContext);

  if (!currentUser) {
    return (
      <div className="p-4 text-center">
        <p className="text-lg">Usuario actual: <strong><SimpleLoader /></strong></p>
      </div>
    );
  }

  return (
    <div className="p-4 text-center">
      <p className="text-lg">
        Usuario actual: <strong>{currentUser.nombre}</strong>
      </p>
    </div>
  );
};

export default CurrentUserInfo;
