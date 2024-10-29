import { useNavigate } from "react-router-dom";

export const useMyNavigation = () => {
  const navigate = useNavigate();

  const goToHome = () => {
    navigate("/");
  };

  const goToRegister = () => {
    navigate("/register");
  };
  const goToGame = () => {
    navigate("/game");
  };
  const goToShowPhoto = () => {
    navigate("/showPhoto");
  };
  const goToFinished = () => {
    navigate("/finish");
  };

  return { goToHome, goToRegister, goToGame, goToFinished, goToShowPhoto };
};
