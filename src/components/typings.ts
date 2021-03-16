export interface IEditNavigationBaseItemProps {
    name: string;
    index: number;
    hoverCallback: (fromIndex: number, hoverIndex: number) => void;
}

/**
 * 拖拽组件的基础props数据
 */
// export interface IEditNavigationBaseItemProps {
//     index: number;
//     hoverCallback: (fromIndex: number, hoverIndex: number) => void;
// }

export enum CloseType {
    OK = 'OK',
    CANCEL = 'CANCEL'
}

export interface NavigationAppInfo {
    name: string;
    id: number;
}
// export interface NavigationInfo {
//     version: number;
//     mainNavigation: NavigationAppInfo[];
//     shortcutNavigation: NavigationAppInfo[];
// }