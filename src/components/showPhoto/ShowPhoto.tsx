import { alpha, Box, Text } from "@mantine/core";
import { useMyNavigation } from "../../hooks/useMyNavigation";
import { useEffect } from "react";
import html2canvas from "html2canvas";
import { firebaseApp } from "../../config/firebase";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useAppStore } from "../../hooks/useAppStore";

export const ShowPhoto = () => {
  const { handledSetImageUrl, imageBlob } = useAppStore();

  const { goToFinished } = useMyNavigation();

  const captureAndUploadImage = async () => {
    const element = document.getElementById("allCapture");

    if (element) {
      const canvas = await html2canvas(element);

      // Convertir el canvas a una imagen optimizada
      canvas.toBlob(async (blob) => {
        if (blob) {
          // Crear una imagen a partir del blob
          const img = new Image();
          img.src = URL.createObjectURL(blob);
          img.onload = async () => {
            // Redimensionar la imagen si es necesario
            const optimizedCanvas = document.createElement("canvas");
            const ctx = optimizedCanvas.getContext(
              "2d"
            ) as CanvasRenderingContext2D;

            const maxWidth = 800; // Ancho máximo deseado
            const scaleFactor = Math.min(maxWidth / img.width, 1);
            optimizedCanvas.width = img.width * scaleFactor;
            optimizedCanvas.height = img.height * scaleFactor;

            // Dibujar la imagen en el canvas optimizado
            ctx.drawImage(
              img,
              0,
              0,
              optimizedCanvas.width,
              optimizedCanvas.height
            );

            // Convertir el canvas optimizado a un blob
            optimizedCanvas.toBlob(
              async (optimizedBlob) => {
                if (optimizedBlob) {
                  const storage = getStorage(firebaseApp);
                  const storageRef = ref(
                    storage,
                    `colombia4.0/captures/${Date.now()}.png`
                  );

                  try {
                    console.log("Optimized blob", optimizedBlob);
                    await uploadBytes(storageRef, optimizedBlob);
                    const downloadURL = await getDownloadURL(storageRef);
                    console.log("Image uploaded and available at", downloadURL);
                    handledSetImageUrl(downloadURL);
                    goToFinished();
                  } catch (uploadError) {
                    console.error("Error uploading image:", uploadError);
                  }
                }
              },
              "image/png",
              0.8
            ); // Ajusta la calidad (0.7 es el 70%)
          };
        }
      }, "image/png");
    }
  };

  useEffect(() => {
    captureAndUploadImage();
  }, []);

  return (
    <Box h={"100vh"} w={"100%"} pos={"relative"} id="allCapture">
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
        <Text fz={"400px"} c={alpha("#00000", 0.3)}>
          Procesando...
        </Text>
      </Box>
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
