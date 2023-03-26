import { useState } from "react";
import styles from "../styles/Column.module.css";
import { AddIcon } from "@chakra-ui/icons";
import useColumnDrop from "@/../hooks/useColumnDrop";
import useColumnTasks from "@/../hooks/useColumnTasks";
import Task from "./Task";
import {
  ModalOverlay,
  Modal,
  Button,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  ModalContent,
  useDisclosure,
  Input,
  Text,
  Box,
  IconButton,
  Stack,
  Flex,
} from "@chakra-ui/react";
const OverlayOne = () => (
  <ModalOverlay
    bg="blackAlpha.300"
    backdropFilter="blur(10px) hue-rotate(20deg)"
  />
);

function Column({ column, tasks, setTasks, actualTasks, setActualTasks }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [overlay, setOverlay] = useState(<OverlayOne />);
  const { addEmptyTask, dropTaskFrom, swapTasks } = useColumnTasks(
    column,
    setTasks
  );

  const { dropRef, isOver } = useColumnDrop(column, dropTaskFrom);

  const ColumnTasks = actualTasks[column]?.map((task, index) => (
    <Task key={task.id} task={task} index={index} onDropHover={swapTasks} />
  ));

  const [newTaskForm, setNewTaskForm] = useState({
    title: "",
    description: "",
    tagName: "",
    tags: [],
  });

  const onChange = (e, name) => {
    setNewTaskForm((fields) => ({ ...fields, [name]: e.target.value }));
  };

  const addNewTag = () => {
    if (!newTaskForm.tagName || newTaskForm.tags.length >= 3) {
      alert("Ao adicionar uma tag adicione um nome e o limite de tags é 3");
      return;
    }
    setNewTaskForm((fields) => ({
      ...fields,
      tags: [...fields.tags, fields.tagName],
      tagName: "",
    }));
  };

  return (
    <Box
      className={styles.kanbanColumn}
      minWidth={330}
    >
      <Flex>
        <h4>{column}</h4>
        <IconButton
          size="xs"
          bgColor="#e2d6ff"
          color="#7c3aed"
          boxShadow="md"
          mx={2}
          py={2}
          variant="solid"
          onClick={() => {
            setOverlay(<OverlayOne />);
            onOpen();
          }}
          colorScheme="black"
          aria-label="add-task"
          icon={<AddIcon />}
        />
      </Flex>
      <Stack
        ref={dropRef}
        _hover={{
          boxShadow:
            "0 4px 6px -1px rgba(0, 0, 0, 0.1),0 2px 4px -1px rgba(0, 0, 0, 0.06) !important",
        }}
        direction={{ base: "row", md: "column" }}
        h={{ base: 400 }}
        p={4}
        mt={2}
        spacing={4}
        rounded="lg"
        overflow="auto"
        opacity={isOver ? 0.85 : 1}
      >
        {ColumnTasks}
      </Stack>

      <Modal size="xl" isCentered isOpen={isOpen} onClose={onClose}>
        {overlay}
        <ModalContent>
          <ModalHeader>Adicionar Task</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form
              onSubmit={(e) => {
                addEmptyTask(e, newTaskForm);
                onClose();
              }}
            >
              <Stack spacing={3}>
                <Text mb="8px">Título</Text>
                <Input
                  id="modal-title"
                  focusBorderColor='purple.200'
                  onChange={(e) => onChange(e, "title")}
                  value={newTaskForm.title}
                />
                <Text mb="8px">Descrição</Text>
                <Input
                  id="modal-description"
                  focusBorderColor='purple.200'
                  onChange={(e) => onChange(e, "description")}
                  value={newTaskForm.description}
                />
                <Text mb="8px">Adicione tags</Text>
                <Flex gap={3}>
                  <Input
                    id="modal-tagName"
                    focusBorderColor='purple.200'
                    width="50%"
                    onChange={(e) => onChange(e, "tagName")}
                    value={newTaskForm.tagName}
                  />
                  <button type="button" onClick={addNewTag}>
                    Add
                  </button>
                </Flex>
                {newTaskForm.tags.map((tag) => (
                  <span className={styles.tag} key={tag}>
                    {tag}
                  </span>
                ))}
                <div className={styles.buttonContainer}>
                  <button className={styles.submitButton} type="submit">
                    Submit
                  </button>
                </div>
              </Stack>
            </form>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default Column;
