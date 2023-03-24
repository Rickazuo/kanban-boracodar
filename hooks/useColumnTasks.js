import { useCallback, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { pickChakraRandomColor, swap } from "../utils/helpers";
const MAX_TASK_PER_COLUMN = 100;

function useColumnTasks(column, setTasks) {
    const [minId, setMinId] = useState(5);
    const addEmptyTask = useCallback(
        (e, form) => {
            e.preventDefault();
            console.log(`Adding new empty task to ${column} column`);
            setTasks((allTasks) => {
                debugger;
                const columnTasks = allTasks[column];

                if (columnTasks.length > MAX_TASK_PER_COLUMN) {
                    console.log("Too many task!");
                    return allTasks;
                }

                const newColumnTask = {
                    id: minId,
                    title: form.title,
                    description: form.description,
                    tags: form.tags,
                    column,
                };

                setMinId((id) => id + 1);

                return {
                    ...allTasks,
                    [column]: [newColumnTask, ...columnTasks],
                };
            });
        },
        [column, setTasks]
    );

    const dropTaskFrom = useCallback(
        (from, id) => {
            setTasks((allTasks) => {
                const fromColumnTasks = allTasks[from];
                const toColumnTasks = allTasks[column];
                const movingTask = fromColumnTasks.find(
                    (task) => task.id === id
                );

                console.log(
                    `Moving task ${movingTask?.id} from ${from} to ${column}`
                );

                if (!movingTask) {
                    return allTasks;
                }
                const newTasks = {
                    ...allTasks,
                    [from]: fromColumnTasks.filter((task) => task.id !== id),
                    [column]: [{ ...movingTask, column }, ...toColumnTasks],
                };

                // remove the task from the original column and copy it within the destination column
                return newTasks;
            });
        },
        [column, setTasks]
    );

    const swapTasks = useCallback(
        (i, j) => {
            console.log(`Swapping task ${i} with ${j} in ${column} column`);
            setTasks((allTasks) => {
                const columnTasks = allTasks[column];
                return {
                    ...allTasks,
                    [column]: swap(columnTasks, i, j),
                };
            });
        },
        [column, setTasks]
    );

    return {
        addEmptyTask,
        dropTaskFrom,
        swapTasks,
    };
}

export default useColumnTasks;
