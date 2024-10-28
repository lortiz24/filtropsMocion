import { Box, Image, Stack, Text } from "@mantine/core";
import QRCode from "react-qr-code";

export const Finish = () => {
  return (
    <Box
      h={"100vh"}
      w={"100%"}
      bg={"#6321C1"}
      pos={"relative"}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div
        style={{
          position: "absolute",
          backgroundImage: 'url("assets/finish/Vector.png")',
          bottom: 0,
          zIndex: 1,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",

          width: "239px" /* El ancho será el de la imagen */,
          height: "707px" /* La altura será la de la imagen */,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            marginTop: "234px",
            backgroundImage: 'url("assets/register/Avatar.png")',
            zIndex: 10,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            width: "109px",
            height: "211px",
          }}
        />
      </div>
      <Stack gap={"151px"} pt={"113px"} w={"100%"} align="center">
        <Image src={"assets/register/LogoBgRegister.png"} w={"832px"} />
        <Stack w={"100%"} align="center" gap={"42px"}>
          <Image src={"assets/finish/Genial.png"} w={"832px"} />
          <Text fz={"50px"} px={"161px"} lh={"53px"} ta={"center"}>
            Gracias por participar, puedes descargar tu foto escaneando el
            siguiente código QR.
          </Text>
          <Box
            w={"380px"}
            h={"380px"}
            bg={"white"}
            style={{
              zIndex: 10,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <QRCode value="https://www.mocion.com.co/" size={341} />
          </Box>
        </Stack>
      </Stack>
    </Box>
  );
};
