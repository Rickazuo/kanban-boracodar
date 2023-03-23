import { useState } from "react";
import { AddIcon } from "@chakra-ui/icons";
import { Badge, Box, Heading, IconButton, Stack } from "@chakra-ui/react";
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
} from "@chakra-ui/react";
const OverlayOne = () => (
    <ModalOverlay
        bg="blackAlpha.300"
        backdropFilter="blur(10px) hue-rotate(20deg)"
    />
);

function Column({ column, tasks, setTasks }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [overlay, setOverlay] = useState(<OverlayOne />);
    const { addEmptyTask, dropTaskFrom, swapTasks } = useColumnTasks(
        column,
        setTasks
    );

    const { dropRef, isOver } = useColumnDrop(column, dropTaskFrom);
    const ColumnTasks = tasks[column]?.map((task, index) => (
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
        setNewTaskForm((fields) => ({
            ...fields,
            tags: [...fields.tags, fields.tagName],
            tagName: "",
        }));
    };

    return (
        <Box
            sx={{
                boxShadow: isOver
                    ? "0 4px 6px -1px rgba(0, 0, 0, 0.1),0 2px 4px -1px rgba(0, 0, 0, 0.06)"
                    : "none",
            }}
            minWidth={330}
        >
            <h4>{column}</h4>
            <IconButton
                size="xs"
                w="full"
                bgColor="purple"
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
            <Stack
                ref={dropRef}
                direction={{ base: "row", md: "column" }}
                h={{ base: 300, md: 600 }}
                p={4}
                mt={2}
                spacing={4}
                rounded="lg"
                boxShadow="md"
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
                            <input
                                id="modal-title"
                                onChange={(e) => onChange(e, "title")}
                                value={newTaskForm.title}
                            />
                            <input
                                id="modal-description"
                                onChange={(e) => onChange(e, "description")}
                                value={newTaskForm.description}
                            />
                            {newTaskForm.tags.map((tag) => (
                                <span>{tag}</span>
                            ))}
                            <input
                                id="modal-tagName"
                                onChange={(e) => onChange(e, "tagName")}
                                value={newTaskForm.tagName}
                            />
                            <button onClick={addNewTag}>Add</button>
                            <button type="submit">Submit</button>
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
