import { useState } from "react";
import { Container, Heading, SimpleGrid } from "@chakra-ui/react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Column from "./Column";
import { ColumnType } from "../../utils/columnType";

const Kanban = () => {
    const [tasks, setTasks] = useState({
        Todo: [
            {
                id: 1,
                column: ColumnType.TO_DO,
                title: "Task 1",
                color: "blue.300",
            },
        ],
        "In Progress": [
            {
                id: 2,
                column: ColumnType.IN_PROGRESS,
                title: "Task 2",
                color: "yellow.300",
            },
        ],
        Blocked: [
            {
                id: 3,
                column: ColumnType.BLOCKED,
                title: "Task 3",
                color: "red.300",
            },
        ],
        Completed: [
            {
                id: 4,
                column: ColumnType.COMPLETED,
                title: "Task 4",
                color: "green.300",
            },
        ],
    });

    return (
        <main>
            <Heading
                fontSize={{ base: "4xl", sm: "5xl", md: "6xl" }}
                fontWeight="bold"
                textAlign="center"
                bgClip="text"
                mt={4}
            >
                Welcome to DnD Kanban
            </Heading>
            <DndProvider backend={HTML5Backend}>
                <Container maxWidth="container.lg" px={4} py={10}>
                    <SimpleGrid
                        columns={{ base: 1, md: 4 }}
                        spacing={{ base: 16, md: 4 }}
                    >
                        <Column
                            tasks={tasks}
                            setTasks={setTasks}
                            column={ColumnType.TO_DO}
                        />
                        <Column
                            tasks={tasks}
                            setTasks={setTasks}
                            column={ColumnType.IN_PROGRESS}
                        />
                        <Column
                            tasks={tasks}
                            setTasks={setTasks}
                            column={ColumnType.BLOCKED}
                        />
                        <Column
                            tasks={tasks}
                            setTasks={setTasks}
                            column={ColumnType.COMPLETED}
                        />
                    </SimpleGrid>
                </Container>
            </DndProvider>
        </main>
    );
};

export default Kanban;
