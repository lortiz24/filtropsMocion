import { Box, Image, Stack } from "@mantine/core";

export const Game = () => {
  return (
    <Box h={"100vh"} w={"100%"} pos={"relative"}>
      <Box
        pos={"absolute"}
        top={0}
        left={0}
        style={{
          backgroundImage: 'url("assets/game/MarcoGame.png")',
          width: "100%",
          height: "100%",
          zIndex: 10,
        }}
      >
        <Stack h={'100%'} justify="center" gap={0}>
          <Image src={"assets/game/ButtonAlas.png"} w={"282.84px"} />
          <Image src={"assets/game/ButtonBigote.png"} w={"282.84px"} />
          <Image src={"assets/game/ButtonMascara.png"} w={"282.84px"} />
        </Stack>
      </Box>
    </Box>
  );
};
