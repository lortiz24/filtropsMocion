import { alpha, Box, Image, Stack, Text } from "@mantine/core";
import { useMyNavigation } from "../../hooks/useMyNavigation";
import { useCountDown } from "../../hooks/useCountDown";
import { useEffect, useLayoutEffect } from "react";
import { deepARManager } from "../../config/deepar";
import { useAppStore } from "../../hooks/useAppStore";
import ButtonAlas from "../../../public/assets/game/ButtonAlas.png";
import ButtonBigote from "../../../public/assets/game/ButtonBigote.png";
import ButtonMascara from "../../../public/assets/game/ButtonMascara.png";

export const Game = () => {
  const { seconds } = useCountDown(10);
  const { handledSetImageBlob } = useAppStore();
  const { goToShowPhoto } = useMyNavigation();
  const auxDeeparInstance = deepARManager.getInstanceDeepAR();

  console.log("auxDeeparInstance", auxDeeparInstance);
  const getCapture = async () => {
    if (seconds > 0) return;
    const deeparInstance = deepARManager.getInstanceDeepAR();
    const imageBlob = await deeparInstance?.takeScreenshot();
    if (!imageBlob) return;
    handledSetImageBlob(imageBlob);
    goToShowPhoto();
    deeparInstance?.stopCamera();
  };

  useLayoutEffect(() => {
    const initializeDeepAR = async () => {
      await deepARManager.initialize();
      deepARManager.getInstanceDeepAR()?.startCamera();
    };

    initializeDeepAR();

    return () => {
      deepARManager.stopCamera(); // Limpieza al desmontar
    };
  }, []);

  useEffect(() => {
    getCapture();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seconds]);

  return (
    <Box h={"100vh"} w={"100%"} pos={"relative"}>
      <div style={{ width: "100%", height: "100%" }} id="myNewDiv"></div>

      <Box
        pos={"absolute"}
        left={0}
        bottom={0}
        style={{
          width: "100%",
          height: "100%",
          zIndex: 100,
          display: "flex",
          justifyContent: "center",
          alignItems: "end",
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
            src={ButtonAlas}
            w={"282.84px"}
            onClick={() => {
              deepARManager.switchEffect("alas");
            }}
          />
          <Image
            src={ButtonBigote}
            w={"282.84px"}
            onClick={() => {
              deepARManager.switchEffect("glasses");
            }}
          />
          <Image
            src={ButtonMascara}
            w={"282.84px"}
            onClick={() => {
              deepARManager.switchEffect("mascara");
            }}
          />
        </Stack>
      </Box>
    </Box>
  );
};
