import { alpha, Box, Image, Stack, Text } from "@mantine/core";
import { useMyNavigation } from "../../hooks/useMyNavigation";
import { useCountDown } from "../../hooks/useCountDown";
import { useEffect, useLayoutEffect } from "react";
import * as deepar from "deepar";
import html2canvas from "html2canvas";
import { firebaseApp } from "../../config/firebase";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const effects = {
  bigote: "",
  alas: "https://firebasestorage.googleapis.com/v0/b/eviusauth.appspot.com/o/colombia4.0%2Falas.deepar?alt=media&token=78760047-a5b9-4ca0-bbb9-447414eb9054",
  glasses:
    "https://firebasestorage.googleapis.com/v0/b/eviusauth.appspot.com/o/colombia4.0%2FGlasses.deepar?alt=media&token=0cc77777-f4ed-4573-ad1c-2fc0067a0c5d",
  mascara:
    "https://firebasestorage.googleapis.com/v0/b/eviusauth.appspot.com/o/colombia4.0%2Fmascara.deepar?alt=media&token=bad27506-0787-4a22-8604-8e19b3da917c",
};

let deepAR: deepar.DeepAR | null = null;
const main = async () => {
  if (deepAR) return;
  deepAR = await deepar.initialize({
    licenseKey:
      "4f0a7bfaa7ad51bf4de83dc9d9db7ff36d5efe504894d1d30580de169b9e278dbd994020650efcac",
    previewElement: document.querySelector("#deepar-canvas") as HTMLElement,
    effect: effects.alas,
    additionalOptions: {
      hint: "enableFaceTrackingCnn",
      cameraConfig: {
        facingMode: "environment",
        disableDefaultCamera: true,
      },
    },
  });
};
main();
export const Game = () => {
  const { goToFinished } = useMyNavigation();
  const { seconds } = useCountDown(10);

  useLayoutEffect(() => {
    if (deepAR) {
      deepAR.changePreviewElement(document.getElementById("myNewDiv")!);
      deepAR.startCamera();
    }
  }, [deepAR]);

  const captureAndUploadImage = async () => {
    const element = document.getElementById("allCapture");

    if (element) {
      const canvas = await html2canvas(element);
      canvas.toBlob(async (blob) => {
        if (blob) {
          // Subida a Firebase
          const storage = getStorage(firebaseApp);
          const storageRef = ref(storage, `captures/${Date.now()}.png`);

          try {
            console.log("blob", blob);
            await uploadBytes(storageRef, blob);
            const downloadURL = await getDownloadURL(storageRef);
            console.log("Image uploaded and available at", downloadURL);
            goToFinished();
            // Aquí puedes dar el enlace de descarga o redirigir al usuario
          } catch (uploadError) {
            console.error("Error uploading image:", uploadError);
          }
        }
      }, "image/png");
    }
  };

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
              if (deepAR) deepAR.switchEffect(effects.alas);
            }}
          />
          <Image
            src={"assets/game/ButtonBigote.png"}
            w={"282.84px"}
            onClick={() => {
              if (deepAR) deepAR.switchEffect(effects.glasses);
            }}
          />
          <Image
            src={"assets/game/ButtonMascara.png"}
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
