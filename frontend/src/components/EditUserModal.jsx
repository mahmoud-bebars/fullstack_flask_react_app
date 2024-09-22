import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  Textarea,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { BiAddToQueue, BiEditAlt } from "react-icons/bi";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { useState } from "react";
import { BASE_URL } from "../App";
const EditUserModel = ({ user, setUsers }) => {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);
  const [inputs, setInputs] = useState({
    name: user.name,
    description: user.description,
    role: user.role,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/friends/${user.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputs),
      });

      const data = await res.json();
      console.log(data);
      if (!res.ok) {
        throw new Error(data.error);
      }
      toast({
        status: "success",
        title: "Yayy!🎉 ",
        description: "Friend updated successfully",
        duration: 2000,
        postion: "top-center",
      });
      setUsers((prev) =>
        prev.map((row) =>
          row.id === user.id
            ? {
                ...row,
                ...inputs,
              }
            : row,
        ),
      );
      onClose();
    } catch (error) {
      toast({
        status: "error",
        title: "An error occured",
        description: error.message,
        duration: 4000,
        postion: "top-center",
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <IconButton
        onClick={onOpen}
        variant={"ghost"}
        colorScheme="blue"
        aria-label="edit-button"
        size={"sm"}
        icon={<BiEditAlt size={20} />}
      />

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <form onSubmit={handleSubmit}>
          <ModalContent>
            <ModalHeader>Edit BFF 🥸</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <Flex alignItems={"center"} gap={4}>
                <FormControl>
                  <FormLabel>Full Name</FormLabel>
                  <Input
                    placeholder="jone doe"
                    value={inputs.name}
                    onChange={(e) =>
                      setInputs({ ...inputs, name: e.target.value })
                    }
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Role</FormLabel>
                  <Input
                    placeholder="Software Engineer"
                    value={inputs.role}
                    onChange={(e) =>
                      setInputs({ ...inputs, role: e.target.value })
                    }
                  />
                </FormControl>
              </Flex>
              <FormControl mt={4}>
                <FormLabel>Description</FormLabel>
                <Textarea
                  resize={"none"}
                  overflow={"hidden"}
                  placeholder="He's a software engineer who loves to code & build Things."
                  value={inputs.description}
                  onChange={(e) =>
                    setInputs({ ...inputs, description: e.target.value })
                  }
                />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button
                type="submit"
                colorScheme="blue"
                mr={3}
                isLoading={isLoading}
                isDisabled={isLoading}
              >
                Save Changes
              </Button>
              <Button isDisabled={isLoading} variant="ghost" onClick={onClose}>
                Cancel
              </Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </>
  );
};

export default EditUserModel;
