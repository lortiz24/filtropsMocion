import { alpha, Box, Image, Stack, Text } from "@mantine/core";
import { useMyNavigation } from "../../hooks/useMyNavigation";
import { useCountDown } from "../../hooks/useCountDown";
import { useEffect } from "react";

export const Game = () => {
  const { goToFinished } = useMyNavigation();
  const { seconds } = useCountDown(10);

  useEffect(() => {
    if (seconds === 0) {
      goToFinished();
    }
  }, [seconds]);

  return (
    <Box h={"100vh"} w={"100%"} pos={"relative"}>
      <Box
        pos={"absolute"}
        top={0}
        left={0}
        style={{
          width: "100%",
          height: "100%",
          zIndex: 100,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Text fz={"500px"} c={alpha("#00000", 0.3)}>
          {seconds}
        </Text>
      </Box>
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
        <Stack h={"100%"} justify="center" gap={0}>
          <Image src={"assets/game/ButtonAlas.png"} w={"282.84px"} />
          <Image src={"assets/game/ButtonBigote.png"} w={"282.84px"} />
          <Image src={"assets/game/ButtonMascara.png"} w={"282.84px"} />
        </Stack>
      </Box>
    </Box>
  );
};
