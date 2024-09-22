import {
  Avatar,
  Box,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  IconButton,
  Text,
  useToast,
} from "@chakra-ui/react";
import EditUserModal from "./EditUserModal";
import { BiTrash } from "react-icons/bi";
import { useState } from "react";
import { BASE_URL } from "../App";

const UserCard = ({ user, setUsers }) => {
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/friends/${user.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      console.log(data);
      if (!res.ok) {
        throw new Error(data.error);
      }
      toast({
        status: "info",
        title: "Info",
        description: "Friend Deleted successfully",
        duration: 2000,
        postion: "top-center",
      });
      setUsers((prev) => prev.filter((row) => row.id !== user.id));
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
    <Card>
      <CardHeader>
        <Flex gap={4}>
          <Flex flex={"1"} gap={4} alignItems={"center"}>
            <Avatar src={user.imgUrl} />
            <Box>
              <Heading size={"sm"}>{user.name}</Heading>
              <Text>{user.role}</Text>
            </Box>
          </Flex>
          <Flex>
            <EditUserModal user={user} setUsers={setUsers} />
            <IconButton
              isLoading={isLoading}
              isDisabled={isLoading}
              variant={"ghost"}
              colorScheme="red"
              size={"sm"}
              aria-label="delete user"
              icon={<BiTrash size={20} />}
              onClick={handleDelete}
            />
          </Flex>
        </Flex>
      </CardHeader>
      <CardBody>
        <Text>{user.description}</Text>
      </CardBody>
    </Card>
  );
};

export default UserCard;
