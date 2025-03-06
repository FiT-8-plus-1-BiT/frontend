import { useDispatch } from "react-redux";
import { logout } from "@/redux/auth-slice";

const LogoutButton = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return <button onClick={handleLogout} className="btn">로그아웃</button>;
};

export default LogoutButton;