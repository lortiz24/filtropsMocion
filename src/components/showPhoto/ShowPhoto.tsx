import { Box } from "@mantine/core";
import { useMyNavigation } from "../../hooks/useMyNavigation";
import { useCountDown } from "../../hooks/useCountDown";
import { useEffect } from "react";
import html2canvas from "html2canvas";
import { firebaseApp } from "../../config/firebase";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useAppStore } from "../../hooks/useAppStore";

export const ShowPhoto = () => {
  const { handledSetImageUrl, imageBlob } = useAppStore();

  const { seconds } = useCountDown(10);
  const { goToFinished } = useMyNavigation();

  const captureAndUploadImage = async () => {
    const element = document.getElementById("allCapture");

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

  useEffect(() => {
    if (seconds === 0) captureAndUploadImage();
  }, [seconds]);

  return (
    <Box h={"100vh"} w={"100%"} pos={"relative"} id="allCapture">
      <img src={imageBlob} width={"100%"} height={"100%"} />
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
      />
    </Box>
  );
};
