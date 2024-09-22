import { Stack, Container, Text } from "@chakra-ui/react";
import Navbar from "./components/Navbar";
import UserGrid from "./components/UserGrid";
export default function App() {
  return (
    <Stack minH={"100vh"}>
      <Navbar />
      <Container maxW={"1200px"} my={4}>
        <Text
          fontSize={{ base: "3xl", md: "50" }}
          fontWeight={"bold"}
          letterSpacing={"2px"}
          textTransform={"uppercase"}
          textAlign={"center"}
          mb={8}
        >
          <Text
            as={"span"}
            bgGradient={"linear(to-r, cyan.400, blue.400)"}
            bgClip={"text"}
            px={4}
          >
            Hello Besties
          </Text>
          🚀
        </Text>
        <UserGrid />
      </Container>
    </Stack>
  );
}
