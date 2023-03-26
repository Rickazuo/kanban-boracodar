import styles from "../styles/Kanban.module.css";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Column from "./Column";
import { ColumnType } from "../../utils/columnType";

const Kanban = ({tasks, setTasks, actualTasks, setActualTasks}) => {
    return (
        <main>
            <DndProvider backend={HTML5Backend}>
                <div className={styles.container}>
                    <Column
                        tasks={tasks}
                        setTasks={setTasks}
                        actualTasks={actualTasks}
                        setActualTasks={setActualTasks}
                        column={ColumnType.TO_DO}
                    />
                    <Column
                        tasks={tasks}
                        setTasks={setTasks}
                        actualTasks={actualTasks}
                        setActualTasks={setActualTasks}
                        column={ColumnType.IN_PROGRESS}
                    />
                    <Column
                        tasks={tasks}
                        setTasks={setTasks}
                        actualTasks={actualTasks}
                        setActualTasks={setActualTasks}
                        column={ColumnType.COMPLETED}
                    />
                </div>
            </DndProvider>
        </main>
    );
};

export default Kanban;
