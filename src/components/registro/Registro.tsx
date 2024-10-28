import { alpha, Box, rem, Stack, Text, TextInput } from "@mantine/core";
import { isEmail, useForm } from "@mantine/form";
import { IconMail, IconUser } from "@tabler/icons-react";
type RegisterForm = {
  name: string;
  email: string;
};
export const Registro = () => {
  const registerForm = useForm<RegisterForm>({
    initialValues: {
      email: "",
      name: "",
    },
    validate: {
      email: isEmail("El correo no es valido"),
      name: (value) => {
        if (value.length <= 2) return "Ingrese un numero valido";
      },
    },
  });

  return (
    <Box
      style={{
        padding: "",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        backgroundImage: 'url("assets/register/BG_Registro.png")',
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          backgroundImage: 'url("assets/register/registerGradient.png")',
          top: -146,
          zIndex: 1,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",

          width: "239px" /* El ancho será el de la imagen */,
          height: "1117px" /* La altura será la de la imagen */,
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

      <Stack
        w={"100%"}
        style={{
          marginTop: "257px",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            backgroundImage: 'url("assets/register/LogoBgRegister.png")',
            width: "100%",
            height: "514px",
          }}
        />
        <Text
          style={{
            fontWeight: "bold",
            fontSize: "120px",
            textAlign: "center",
          }}
        >
          Registro
        </Text>

        <form
          onSubmit={registerForm.onSubmit((formData) => {
            console.log("formData", formData);
          })}
        >
          <Stack align="center" gap={"36px"}>
            <TextInput
              size="xl"
              styles={{
                input: {
                  height: "110px",
                  fontSize: "40px",
                  color: "white",
                  backgroundColor: alpha("#FFFFFF", 0.3),
                },
                error: {
                  fontSize: "40px",
                },
              }}
              placeholder="Nombre"
              leftSection={
                <IconUser
                  style={{ width: rem(40), height: rem(50) }}
                  color="white"
                />
              }
              radius={"24px"}
              w={"855px"}
              value={registerForm.values.name}
              onChange={({ target: { value } }) => {
                registerForm.setFieldValue("name", value);
              }}
              error={registerForm.errors.name}
            />
            <TextInput
              size="xl"
              styles={{
                input: {
                  height: "110px",
                  fontSize: "40px",
                  color: "white",
                  backgroundColor: alpha("#FFFFFF", 0.3),
                },
                error: {
                  fontSize: "40px",
                },
              }}
              placeholder="Correo electrónico"
              leftSection={
                <IconMail
                  style={{ width: rem(40), height: rem(50) }}
                  color="white"
                />
              }
              radius={"24px"}
              w={"855px"}
              value={registerForm.values.email}
              onChange={({ target: { value } }) => {
                registerForm.setFieldValue("email", value);
              }}
              error={registerForm.errors.email}
            />
            <Box
              style={{ display: "flex", justifyContent: "center" }}
              mt={"107px"}
            >
              <button
                type="submit"
                style={{
                  padding: "43px 113px",
                  fontSize: "65px",
                  borderRadius: "24px",
                  backgroundColor: "#EB0AFF",
                  color: "white",
                }}
              >
                Comenzar
              </button>
            </Box>
          </Stack>
        </form>
      </Stack>
    </Box>
  );
};
