import { Box, Group, Image, Stack, Text } from "@mantine/core";
import { useMyNavigation } from "../../hooks/useMyNavigation";

export const Home = () => {
  const { goToRegister } = useMyNavigation();
  return (
    <Stack h={"100vh"} w={"100%"} pos={"relative"}>
      <video
        src="/public/assets/home/videoBgHome.webm"
        style={{ position: "absolute", zIndex: -10 }}
        autoPlay
      />
      <Box mt={"800px"}>
        {" "}
        <Stack gap={"94px"}>
          <Group px={114}>
            <Image src={"assets/home/tituloHom.png"} />
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
