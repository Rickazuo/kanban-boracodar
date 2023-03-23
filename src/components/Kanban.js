import { Container, Heading, SimpleGrid } from "@chakra-ui/react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Column from "./Column";
import { ColumnType } from "../../utils/columnType";

const Kanban = () => {
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
                        <Column column={ColumnType.TO_DO} />
                        <Column column={ColumnType.IN_PROGRESS} />
                        <Column column={ColumnType.BLOCKED} />
                        <Column column={ColumnType.COMPLETED} />
                    </SimpleGrid>
                </Container>
            </DndProvider>
        </main>
    );
};

export default Kanban;
