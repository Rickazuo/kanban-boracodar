import { useState } from "react";
import { Container, SimpleGrid } from "@chakra-ui/react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Column from "./Column";
import { ColumnType } from "../../utils/columnType";

const Kanban = () => {
    const [tasks, setTasks] = useState({
        "A fazer": [
            {
                id: 1,
                column: ColumnType.TO_DO,
                title: "Task 1",
                color: "blue.300",
            },
        ],
        Fazendo: [
            {
                id: 2,
                column: ColumnType.IN_PROGRESS,
                title: "Task 2",
                color: "yellow.300",
            },
        ],
        Feito: [
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
                            column={ColumnType.COMPLETED}
                        />
                    </SimpleGrid>
                </Container>
            </DndProvider>
        </main>
    );
};

export default Kanban;
