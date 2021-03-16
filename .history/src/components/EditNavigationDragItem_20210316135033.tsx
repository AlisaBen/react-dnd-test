import React from 'react';
import { DragSource, DropTarget } from 'react-dnd';
// import { IconDrag } from '@lark/icons';
import { DndType, DragSourceParam, DropTargetParam, IDragSourceProps, IDropTargetProps } from './dnd-type';
import { IEditNavigationDragItemProps, IEditNavigationBaseItemProps } from './typings';

@DragSource(DndType, DragSourceParam.spec, DragSourceParam.collect)
@DropTarget(DndType, DropTargetParam.spec, DropTargetParam.collect)
class EditNavigationDragItem extends React.Component<
    IEditNavigationDragItemProps & IEditNavigationBaseItemProps &
    Partial<IDragSourceProps> &
    Partial<IDropTargetProps>
> {
    /**
     * 列表组件优化
     * 顺序发生改变的item
     * 拖拽结束时触发的拖拽状态改变的组件，重新渲染回列表
     * @param nextProps 待更新props
     * @returns boolean
     */
    // shouldComponentUpdate(nextProps: any) {
    //     return nextProps.index !== this.props.index || nextProps.isDragging !== this.props.isDragging;
    // }
    render() {
        const {
            name,
            connectDragSource,
            connectDropTarget,
            isDragging,
            setDraggableIndex,
            index,
            setTop
        } = this.props;
        // TODO: 置顶菜单不支持拖拽，不展示拖拽组件
        return connectDragSource(connectDropTarget(
            <li style={{ opacity: isDragging ? 0 : 1 }} 
                onMouseEnter={() => { setDraggableIndex(index);}}
                onMouseLeave={() => { setDraggableIndex(null); }}
            >
                {this.props.children}
                {name}
                {/* {
                    !setTop && <IconDrag
                    className="icon-drag"
                    onMouseEnter={() => { setDraggableIndex(index);}}
                    onMouseLeave={() => { setDraggableIndex(null); }}
                 />
                } */}
            </li>
        ));
    }
}
export {
    EditNavigationDragItem
};