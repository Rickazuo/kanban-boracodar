import { DeleteIcon } from "@chakra-ui/icons";
import { Box, IconButton, ScaleFade } from "@chakra-ui/react";
//import _ from "lodash";
import { memo } from "react";
import { useTaskDragAndDrop } from "@/../hooks/useTaskDragAndDrop";

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
                rounded="lg"
                w={200}
                h={200}
                pl={3}
                pr={7}
                pt={3}
                pb={1}
                boxShadow="xl"
                cursor="grab"
                fontWeight="bold"
                userSelect="none"
                bgColor={task.color}
                opacity={isDragging ? 0.5 : 1}
            ></Box>
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
