import { useState } from "react";
import styles from "../styles/Kanban.module.css";
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
                description:
                    "Novo desafio do #boraCodar da Rocketseat, onde é proposto construir um quadro de Kanban.",
                tags: ["rocketseat", "desafio"],
                title: "#boraCodar um Kanban 🧑‍💻",
            },
        ],
        Fazendo: [
            {
                id: 2,
                column: ColumnType.IN_PROGRESS,
                description:
                    "Conferir o novo projeto do #boraCodar para fazê-lo da melhor maneira possível",
                tags: ["rocketseat", "desafio"],
                title: "Conferir o novo desafio 🚀 ",
            },
        ],
        Feito: [
            {
                id: 3,
                column: ColumnType.COMPLETED,
                description:
                    "Novo desafio do #boraCodar da Rocketseat, onde é proposto construir um quadro de Kanban.",
                tags: ["rocketseat", "desafio"],
                title: "#boraCodar uma página de login 🧑‍💻",
            },
        ],
    });

    return (
        <main>
            <DndProvider backend={HTML5Backend}>
                <div className={styles.container}>
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
                </div>
            </DndProvider>
        </main>
    );
};

export default Kanban;
