import { alpha, Box, Image, Stack, Text } from "@mantine/core";
import { useMyNavigation } from "../../hooks/useMyNavigation";
import { useCountDown } from "../../hooks/useCountDown";
import { useEffect, useLayoutEffect } from "react";
import html2canvas from "html2canvas";
import { firebaseApp } from "../../config/firebase";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useAppStore } from "../../hooks/useAppStore";
import { deepARManager } from "../../config/deepar";

export const Game = () => {
  const { goToFinished } = useMyNavigation();
  const { seconds } = useCountDown(10);
  const { handledSetImageUrl } = useAppStore();

  const captureAndUploadImage = async () => {
    const element = document.getElementById("allCapture");
    const image = await deepARManager.getInstanceDeepAR()?.takeScreenshot();

    if (element) {
      const canvas = await html2canvas(element);
      canvas.toBlob(async (blob) => {
        if (blob) {
          // Subida a Firebase
          const storage = getStorage(firebaseApp);
          const storageRef = ref(
            storage,
            `colombia4.0/captures/${Date.now()}.png`
          );

          try {
            console.log("blob", blob);
            await uploadBytes(storageRef, blob);
            const downloadURL = await getDownloadURL(storageRef);
            console.log("Image uploaded and available at", downloadURL);
            handledSetImageUrl(downloadURL);
            goToFinished();
            // Aquí puedes dar el enlace de descarga o redirigir al usuario
          } catch (uploadError) {
            console.error("Error uploading image:", uploadError);
          }
        }
      }, "image/png");
    }
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
    if (seconds === 0) {
      captureAndUploadImage();
    }
  }, [seconds]);

  return (
    <Box h={"100vh"} w={"100%"} pos={"relative"} id="allCapture">
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
            src={"assets/game/ButtonAlas.png"}
            w={"282.84px"}
            onClick={() => {
              deepARManager.switchEffect("alas");
            }}
          />
          <Image
            src={"assets/game/ButtonBigote.png"}
            w={"282.84px"}
            onClick={() => {
              deepARManager.switchEffect("glasses");
            }}
          />
          <Image
            src={"assets/game/ButtonMascara.png"}
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
