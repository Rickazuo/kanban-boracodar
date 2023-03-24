import { useDrop } from "react-dnd";

function useColumnDrop(column, handleDrop) {
    const [{ isOver }, dropRef] = useDrop({
        accept: "Task",
        drop: (dragItem) => {
            if (!dragItem || dragItem.from === column) {
                return;
            }

            handleDrop(dragItem.from, dragItem.id);
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
        }),
    });

    return {
        isOver,
        dropRef,
    };
}

export default useColumnDrop;
