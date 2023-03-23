import { AddIcon } from "@chakra-ui/icons";
import { Badge, Box, Heading, IconButton, Stack } from "@chakra-ui/react";
import useColumnDrop from "@/../hooks/useColumnDrop";
import useColumnTasks from "@/../hooks/useColumnTasks";
import Task from "./Task";

function Column({ column, tasks, setTasks }) {
    const { addEmptyTask, dropTaskFrom, swapTasks } = useColumnTasks(
        column,
        tasks,
        setTasks
    );

    const { dropRef, isOver } = useColumnDrop(column, dropTaskFrom);
    const ColumnTasks = tasks[column]?.map((task, index) => (
        <Task key={task.id} task={task} index={index} onDropHover={swapTasks} />
    ));

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
                onClick={addEmptyTask}
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
        </Box>
    );
}

export default Column;
