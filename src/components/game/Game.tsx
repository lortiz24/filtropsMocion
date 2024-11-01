import { alpha, Box, Image, Stack, Text } from "@mantine/core";
import { useMyNavigation } from "../../hooks/useMyNavigation";
import { useCountDown } from "../../hooks/useCountDown";
import { useEffect, useLayoutEffect } from "react";
// import { deepARManager } from "../../config/deepar";
import { useAppStore } from "../../hooks/useAppStore";
import ButtonAlas from "../../../public/assets/game/ButtonAlas.png";
import ButtonBigote from "../../../public/assets/game/Glasses.png";
import ButtonMascara from "../../../public/assets/game/ButtonMascara.png";
import * as deepar from "deepar";

const effects = {
  bigote: "",
  alas: "effects/alas.deepar",
  glasses: "effects/Glasses.deepar",
  mascara: "effects/mascara.deepar",
};
let deepAR: deepar.DeepAR | null = null;

const main = async () => {
  if (deepAR) return;
  deepAR = await deepar.initialize({
    licenseKey:
      "7af117355cf4e47dd39ec397e838f82f64bcefeb3923bb2239caffdeee686bd0cbd4f6599d3f30cf",
    previewElement: document.querySelector("#deepar-canvas") as HTMLElement,
    effect: effects.alas,
    additionalOptions: {
      hint: "enableFaceTrackingCnn",
      cameraConfig: {
        facingMode: "user",
        disableDefaultCamera: true,
      },
    },
  });
};
main();

export const Game = () => {
  const { seconds } = useCountDown(15);
  const { handledSetImageBlob } = useAppStore();
  const { goToShowPhoto } = useMyNavigation();

  useLayoutEffect(() => {
    if (deepAR) {
      deepAR.changePreviewElement(document.getElementById("myNewDiv")!);
      deepAR.setZoom(0.5);
      deepAR.startCamera();
    }
  }, [deepAR]);

  /* const auxDeepar = deepARManager.getInstanceDeepAR();
console.log('auxDeepar', auxDeepar)
  useEffect(() => {
    if (auxDeepar) {
      auxDeepar.startCamera();
    }
  }, []);
 */
  const getCapture = async () => {
    if (seconds > 0) return;
    /* const deeparInstance = deepARManager.getInstanceDeepAR();
    const imageBlob = await deeparInstance?.takeScreenshot(); */
    const imageBlob = await deepAR?.takeScreenshot();
    if (!imageBlob) return;
    handledSetImageBlob(imageBlob);
    goToShowPhoto();
    deepAR?.stopCamera();
  };

  /*  useLayoutEffect(() => {
    if (!auxDeepar) {
      const initializeDeepAR = async () => {
        await deepARManager.initialize();
        console.log(
          "deepARManager.getInstanceDeepAR()",
          deepARManager.getInstanceDeepAR()
        );
        deepARManager.getInstanceDeepAR()?.startCamera();
      };

      initializeDeepAR();
    }
    return () => {
      console.log("Me desmonte");
      deepARManager.stopCamera();
    };
  }, []); */

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
              // deepARManager.switchEffect("alas");
              if (deepAR) deepAR.switchEffect(effects.alas);
            }}
          />
          <Image
            src={ButtonBigote}
            w={"282.84px"}
            onClick={() => {
              console.log("deepAR", deepAR);
              if (deepAR) deepAR.switchEffect(effects.glasses);
              // deepARManager.switchEffect("glasses");
            }}
          />
          <Image
            src={ButtonMascara}
            w={"282.84px"}
            onClick={() => {
              if (deepAR) deepAR.switchEffect(effects.mascara);
            }}
          />
        </Stack>
      </Box>
    </Box>
  );
};
