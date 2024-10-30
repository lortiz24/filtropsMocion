import { Box, Group, Image, Stack, Text } from "@mantine/core";
import { useMyNavigation } from "../../hooks/useMyNavigation";
import tituloHome from "../../../public/assets/home/tituloHom.png";
import videoBg from "../../../public/assets/home/videoBgHome.webm";
import { useEffect } from "react";
import { useAppStore } from "../../hooks/useAppStore";
export const Home = () => {
  const { goToRegister } = useMyNavigation();
  const { handledClearSlice } = useAppStore();

  useEffect(() => {
    handledClearSlice();
  }, []);

  return (
    <Stack h={"100vh"} w={"100%"} pos={"relative"}>
      <video
        id="myHomeVideo"
        src={videoBg}
        style={{ position: "absolute", zIndex: -10 }}
        autoPlay
      />
      <Box mt={"800px"}>
        {" "}
        <Stack gap={"94px"}>
          <Group px={114}>
            <Image src={tituloHome} />
          </Group>
          <Text fz={"50px"} px={"161px"} lh={"53px"} style={{ color: "white" }}>
            Selecciona un elemento y tómate una fotografía utilizando filtros de
            realidad aumentada.
          </Text>
        </Stack>
        <Box style={{ display: "flex", justifyContent: "center" }} mt={"107px"}>
          <button
            onClick={goToRegister}
            style={{
              padding: "43px 113px",
              fontSize: "65px",
              borderRadius: "24px",
              backgroundColor: "#EB0AFF",
              color: "white",
            }}
          >
            ¡Empecemos ahora!
          </button>
        </Box>
      </Box>
    </Stack>
  );
};
