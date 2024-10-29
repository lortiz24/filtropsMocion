import { alpha, Box, Image, Stack, Text } from "@mantine/core";
import { useMyNavigation } from "../../hooks/useMyNavigation";
import { useCountDown } from "../../hooks/useCountDown";
import { useEffect, useLayoutEffect } from "react";
import * as deepar from "deepar";

const effects = {
  bigote: "",
  alas: "https://firebasestorage.googleapis.com/v0/b/eviusauth.appspot.com/o/colombia4.0%2Falas.deepar?alt=media&token=78760047-a5b9-4ca0-bbb9-447414eb9054",
  glasses:
    "https://firebasestorage.googleapis.com/v0/b/eviusauth.appspot.com/o/colombia4.0%2FGlasses.deepar?alt=media&token=0cc77777-f4ed-4573-ad1c-2fc0067a0c5d",
  mascara:
    "https://firebasestorage.googleapis.com/v0/b/eviusauth.appspot.com/o/colombia4.0%2Fmascara.deepar?alt=media&token=bad27506-0787-4a22-8604-8e19b3da917c",
};
export const deepAR = await deepar.initialize({
  licenseKey:
    "4688c3fb0c14be9f26fc06708e39132fca8fa2bc4e515a0b4dad8918c97f5a5a13d7392afadfedfe",
  previewElement: document.querySelector("#deepar-canvas") as HTMLElement,
  effect: effects.glasses,
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
  const { seconds } = useCountDown(45);

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
          <Image
            src={"assets/game/ButtonAlas.png"}
            w={"282.84px"}
            onClick={() => {
              deepAR.switchEffect(effects.alas);
            }}
          />
          <Image
            src={"assets/game/ButtonBigote.png"}
            w={"282.84px"}
            onClick={() => {
              deepAR.switchEffect(effects.glasses);
            }}
          />
          <Image
            src={"assets/game/ButtonMascara.png"}
            w={"282.84px"}
            onClick={() => {
              deepAR.switchEffect(effects.mascara);
            }}
          />
        </Stack>
      </Box>
    </Box>
  );
};
