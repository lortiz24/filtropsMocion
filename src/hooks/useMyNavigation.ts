import { useNavigate } from "react-router-dom";

export const useMyNavigation = () => {
  const navigate = useNavigate();

  const goToHome = () => {
    navigate("/home");
  };

  const goToRegister = () => {
    navigate("/register");
  };
  const goToGame = () => {
    navigate("/game");
  };

  return { goToHome, goToRegister, goToGame };
};
