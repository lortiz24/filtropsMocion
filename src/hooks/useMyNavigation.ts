import { useNavigate } from "react-router-dom";

export const useMyNavigation = () => {
  const navigate = useNavigate();

  const goToHome = () => {
    navigate("/home");
  };

  const goToRegister = () => {
    navigate("/register");
  };

  return { goToHome, goToRegister };
};
