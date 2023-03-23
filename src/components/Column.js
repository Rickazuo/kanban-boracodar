import { AddIcon } from "@chakra-ui/icons";
import { Badge, Box, Heading, IconButton, Stack } from "@chakra-ui/react";
import useColumnDrop from "@/../hooks/useColumnDrop";
import useColumnTasks from "@/../hooks/useColumnTasks";
import Task from "./Task";

function Column({ column }) {
    const { tasks, addEmptyTask, dropTaskFrom, swapTasks } =
        useColumnTasks(column);

    const { dropRef, isOver } = useColumnDrop(column, dropTaskFrom);
    const ColumnTasks = tasks?.map((task, index) => (
        <Task key={task.id} task={task} index={index} onDropHover={swapTasks} />
    ));

    return (
        <Box>
            <Heading fontSize="md" mb={4} letterSpacing="wide">
                <Badge px={2} py={1} rounded="lg">
                    {column}
                </Badge>
            </Heading>
            <IconButton
                size="xs"
                w="full"
                //color={useColorModeValue("gray.500", "gray.400")}
                //bgColor={useColorModeValue("gray.100", "gray.700")}
                //_hover={{ bgColor: useColorModeValue("gray.200", "gray.600") }}
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
                //bgColor={useColorModeValue("gray.50", "gray.900")}
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
