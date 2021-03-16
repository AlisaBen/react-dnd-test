export interface IEditNavigationDragItemProps {
    name: string;
    setTop: boolean;
}

/**
 * 拖拽组件的基础props数据
 */
export interface IEditNavigationBaseItemProps {
    index: number;
    hoverCallback: (fromIndex: number, hoverIndex: number) => void;
}

export enum CloseType {
    OK = 'OK',
    CANCEL = 'CANCEL'
}