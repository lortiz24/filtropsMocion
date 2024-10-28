import {
  Button,
  Center,
  Group,
  Modal,
  Paper,
  Select,
  Stack,
  TextInput,
} from "@mantine/core";
import { IconSettings, IconUser } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
export const CheckInUser = () => {
  const [opened, handlers] = useDisclosure(false);
  return (
    <div className="container-checking">
      <Modal opened={opened} onClose={handlers.close}>
        <Stack>
          <Select
            clearable={false}
            // value={experienceSelected}
            miw={400}
            label="Experiencia"
            // data={allExperience}
            // onChange={(value) => handleChangeExperienceSelected(value ?? "")}
          />
        </Stack>
        <Group align="flex-end" justify="end" mt={20}>
          <Button radius={"md"} variant="filled" onClick={handlers.close}>
            Guardar
          </Button>
        </Group>
      </Modal>
      {/* <div className="logo-top">
        <img
          src={tic}
          alt="logo"
          style={{ width: "80px", marginInline: "10px" }}
        />
      </div> */}
      {/* <img src={logo} alt="logo" style={{ width: "500px" }} /> */}
      <div className="icon-settings">
        <Button radius={"md"} variant="transparent" onClick={handlers.open}>
          <IconSettings style={{ color: "#EB0AFF" }} />
        </Button>
      </div>
      <Paper shadow="none" p="xl" c={"white"} maw={1080} bg={"transparent"}>
        <Center>
          <form
            // onSubmit={onSubmit}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <h1>Registro</h1>
            <Stack px="md">
              <Group style={{ display: "flex", flexDirection: "column" }}>
                <TextInput
                  className="inputcheck"
                  variant="unstyled"
                  required
                  fz={"h3"}
                  name="names"
                  leftSection={<IconUser />}
                  placeholder="Ingrese su nombre"
                  miw={400}
                  //   value={checkInForm.values.names}
                  //   onChange={({ target: { value } }) => {
                  //     checkInForm.setFieldValue("names", value);
                  //   }}
                  //   error={checkInForm.errors.userCode}
                />
                <TextInput
                  className="inputcheck"
                  variant="unstyled"
                  fz={"h3"}
                  required
                  name="email"
                  leftSection="@"
                  placeholder="Ingrese el correo"
                  miw={400}
                  /*  value={checkInForm.values.email}
                  onChange={({ target: { value } }) => {
                    checkInForm.setFieldValue("email", value);
                  }}
                  error={checkInForm.errors.userCode} */
                />
              </Group>

              <Button
                type="submit"
                radius={"md"}
                // loading={isSaving}
                style={{ backgroundColor: "#EB0AFF", height: 50 }}
                /*  disabled={
                  isSaving || Object.keys(checkInForm.errors).length > 0
                } */
              >
                Comenzar
              </Button>
            </Stack>
          </form>
        </Center>
      </Paper>
    </div>
  );
};
