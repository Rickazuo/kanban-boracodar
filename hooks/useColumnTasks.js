import { useCallback, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { pickChakraRandomColor, swap } from "../utils/helpers";
import { ColumnType } from "../utils/columnType";
const MAX_TASK_PER_COLUMN = 100;

function useColumnTasks(column) {
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
    const columnTasks = tasks[column];

    const addEmptyTask = useCallback(() => {
        console.log(`Adding new empty task to ${column} column`);
        setTasks((allTasks) => {
            const columnTasks = allTasks[column];

            if (columnTasks.length > MAX_TASK_PER_COLUMN) {
                console.log("Too many task!");
                return allTasks;
            }

            const newColumnTask = {
                id: uuidv4(),
                title: `New ${column} task`,
                color: pickChakraRandomColor(".300"),
                column,
            };

            return {
                ...allTasks,
                [column]: [newColumnTask, ...columnTasks],
            };
        });
    }, [column, setTasks]);

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
                //setTasks(newTasks);
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
        tasks: columnTasks,
        addEmptyTask,
        dropTaskFrom,
        swapTasks,
    };
}

export default useColumnTasks;
