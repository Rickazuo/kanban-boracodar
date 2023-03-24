import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";

export function useTaskDragAndDrop({ task, index }, handleDropHover) {
    const ref = useRef(null);

    const [{ isDragging }, drag] = useDrag({
        item: { from: task.column, id: task.id, index },
        type: "Task",
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    const [_, drop] = useDrop({
        accept: "Task",
        hover: (item, monitor) => {
            if (!ref.current) {
                return;
            }

            // the tasks are not on the same column
            if (item.from !== task.column) {
                return;
            }

            const draggedItemIndex = item.index;
            const hoveredItemIndex = index;

            // we are swapping the task with itself
            if (draggedItemIndex === hoveredItemIndex) {
                return;
            }

            const isDraggedItemAboveHovered =
                draggedItemIndex < hoveredItemIndex;
            const isDraggedItemBelowHovered = !isDraggedItemAboveHovered;

            // get mouse coordinatees
            const { x: mouseX, y: mouseY } = monitor.getClientOffset();

            // get hover item rectangle
            const hoveredBoundingRect = ref.current.getBoundingClientRect();

            // Get hover item middle height position
            const hoveredMiddleHeight =
                (hoveredBoundingRect.bottom - hoveredBoundingRect.top) / 2;

            const mouseYRelativeToHovered = mouseY - hoveredBoundingRect.top;
            const isMouseYAboveHoveredMiddleHeight =
                mouseYRelativeToHovered < hoveredMiddleHeight;
            const isMouseYBelowHoveredMiddleHeight =
                mouseYRelativeToHovered > hoveredMiddleHeight;

            // Only perform the move when the mouse has crossed half of the items height
            // When dragging downwards, only move when the cursor is below 50%
            // When dragging upwards, only move when the cursor is above 50%

            if (isDraggedItemAboveHovered && isMouseYAboveHoveredMiddleHeight) {
                return;
            }

            if (isDraggedItemBelowHovered && isMouseYBelowHoveredMiddleHeight) {
                return;
            }

            // Time to actually perform the action
            handleDropHover(draggedItemIndex, hoveredItemIndex);

            // Note: we're mutating the monitor item here!
            // Generally it's better to avoid mutations,
            // but it's good here for the sake of performance
            // to avoid expensive index searches.
            item.index = hoveredItemIndex;
        },
    });

    drag(drop(ref));

    return {
        ref,
        isDragging,
    };
}
