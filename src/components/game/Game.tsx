import { alpha, Box, Image, Stack, Text } from "@mantine/core";
import { useMyNavigation } from "../../hooks/useMyNavigation";
import { useCountDown } from "../../hooks/useCountDown";
import { useEffect, useLayoutEffect } from "react";
import * as deepar from "deepar";

const effect = {
  bigote: "",
  alas: "public/effects/alas.deepar",
  glasses: "public/effects/Glasses.deepar",
  mascara: "public/effects/mascara.deepar",
};
export const deepAR = await deepar.initialize({
  licenseKey:
    "4688c3fb0c14be9f26fc06708e39132fca8fa2bc4e515a0b4dad8918c97f5a5a13d7392afadfedfe",
  previewElement: document.querySelector("#deepar-canvas"),
  effect: effect.glasses,
  additionalOptions: {
    hint: "enableFaceTrackingCnn",
    cameraConfig: {
      facingMode: "environment",
      disableDefaultCamera: true,
    },
  },
});

export const Game = () => {
  const { goToFinished } = useMyNavigation();
  const { seconds } = useCountDown(10);

  useEffect(() => {
    if (seconds === 0) {
      goToFinished();
    }
  }, [seconds]);

  useLayoutEffect(() => {
    deepAR.changePreviewElement(document.getElementById("myNewDiv")!);
    deepAR.startCamera();
  }, []);

  return (
    <Box h={"100vh"} w={"100%"} pos={"relative"}>
      <div style={{ width: "100%", height: "100%" }} id="myNewDiv"></div>

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
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          width: "100%",
          height: "100%",
          zIndex: 1000,
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
