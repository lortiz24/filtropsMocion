import "@mantine/core/styles.css";
import { Box, MantineProvider } from "@mantine/core";
import { theme } from "./theme";
import { Home } from "./components/home/Home";
import "./App.css";
import { HashRouter, Route, Routes } from "react-router-dom";
import { Registro } from "./components/registro/Registro";
import { Game } from "./components/game/Game";
import { Finish } from "./components/finish/Finish";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { ShowPhoto } from "./components/showPhoto/ShowPhoto";
export default function App() {
  return (
    <HashRouter>
      <Provider store={store}>
        <MantineProvider theme={theme}>
          <Box h={"100vh"}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/register" element={<Registro />} />
              <Route path="/game" element={<Game />} />
              <Route path="/showPhoto" element={<ShowPhoto />} />
              <Route path="/finish" element={<Finish />} />
            </Routes>
          </Box>
        </MantineProvider>
      </Provider>
    </HashRouter>
  );
}
