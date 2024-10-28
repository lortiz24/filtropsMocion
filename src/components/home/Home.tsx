import { BackgroundImage, Stack, Text } from "@mantine/core";

export const Home = () => {
  return (
    <BackgroundImage
      src="assets/home/bgHome.jpg"
      style={{ minHeight: "100vh" }}
      w={"100%"}
    >
      <Stack h={"100%"} w={"100%"}>
        <Text fw={"bold"} fz={"120px"}>
          Fotografía
        </Text>
      </Stack>
    </BackgroundImage>
  );
};
