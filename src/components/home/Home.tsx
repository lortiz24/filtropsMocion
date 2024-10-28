import { BackgroundImage, Box, Group, Image, Stack, Text } from "@mantine/core";
import { useMyNavigation } from "../../hooks/useMyNavigation";

export const Home = () => {
  const { goToRegister } = useMyNavigation();
  return (
    <BackgroundImage
      src="assets/home/bgHome.jpg"
      style={{ height: "100vh" }}
      w={"100%"}
    >
      <Stack h={"100%"} w={"100%"} justify="center">
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
      </Stack>
    </BackgroundImage>
  );
};
