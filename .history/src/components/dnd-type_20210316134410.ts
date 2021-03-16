import { DropTargetConnector, DropTargetMonitor, DragSourceMonitor, DragSourceConnector } from 'react-dnd';
import { IEditNavigationBaseItemProps } from './typings';
export const DndType = 'DRAG_ITEM_TYPE';

let draggableIndex: number || void = null;
let lastFromIndex = null;
let lastToIndex = null;

export interface IDragSourceProps {
    connectDragSource: Function;
    isDragging: boolean;
    setDraggableIndex: (i: number) => void;
}

export const DragSourceParam = {
    spec: {
        beginDrag(props: IEditNavigationBaseItemProps) {
            return {
                index: props.index
            };
        },
        canDrag(props: IEditNavigationBaseItemProps) {
            return draggableIndex === props.index;
        },
        isDragging(props: IEditNavigationBaseItemProps, monitor: DragSourceMonitor) {
            return props.index === monitor.getItem().index;
        }
    },
    collect: (connect: DragSourceConnector, monitor: DragSourceMonitor) => ({
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging(),
        setDraggableIndex: (index: number) => {
            draggableIndex = index;
        }
    })
};

export interface IDropTargetProps {
    connectDropTarget: Function;
}
export const DropTargetParam = {
    spec: {
        hover(props: IEditNavigationBaseItemProps, monitor: DropTargetMonitor) {
            const fromIndex = monitor.getItem().index;
            const toIndex = props.index;
            if (lastFromIndex === fromIndex && lastToIndex === toIndex) {
                return;
            }
            lastFromIndex = fromIndex;
            lastToIndex = toIndex;// 正在被监听的元素
            monitor.getItem().index = toIndex;
            props.hoverCallback(fromIndex, toIndex);
        }
    },
    collect: (connect: DropTargetConnector) => ({
        connectDropTarget: connect.dropTarget()
    })
};
