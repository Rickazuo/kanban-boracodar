import { Box, ScaleFade } from "@chakra-ui/react";
//import _ from "lodash";
import { memo } from "react";
import { useTaskDragAndDrop } from "@/../hooks/useTaskDragAndDrop";
import styles from "../styles/Task.module.css";

function Task({ index, task, onDropHover: handleDropHover }) {
    const { ref, isDragging } = useTaskDragAndDrop(
        { task, index: index },
        handleDropHover
    );

    return (
        <ScaleFade in={true} unmountOnExit>
            <Box
                ref={ref}
                as="div"
                role="group"
                position="relative"
                sx={{boxShadow: "0px 4px 16px #EAE2FD"}}
                rounded="lg"
                w={320}
                pl={8}
                pr={8}
                pt={8}
                pb={8}
                background="white"
                cursor="grab"
                fontWeight="bold"
                userSelect="none"
                bgColor={task.color}
                opacity={isDragging ? 0.5 : 1}
            >
                <div className={styles.containerBox}>
                    <h5 className={styles.title}>{task.title}</h5>
                    <p className={styles.description}>{task.description}</p>
                    <div className={styles.tags}>
                        {task.tags.map((tag) => (
                            <span key={tag}>{tag}</span>
                        ))}
                    </div>
                </div>
            </Box>
        </ScaleFade>
    );
}
export default memo(Task, (prev, next) => {
    if (
        //_.isEqual(prev.task, next.task) &&
        //_.isEqual(prev.index, next.index) &&
        prev.onDelete === next.onDelete &&
        prev.onDropHover === next.onDropHover &&
        prev.onUpdate === next.onUpdate
    ) {
        return true;
    }

    return false;
});
