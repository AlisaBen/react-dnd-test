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

export interface NavigationAppInfo {
    id: string;
    key: string;
    name: string;
    type: string;
    visible: boolean;
    pathShortcutLogoPng?: string;
    urlShortcutLogoPng?: string;
    urlPrimaryLogoSvg?: string;
    urlPrimaryLogoDefaultPng?: string;
    urlPrimaryLogoSelectedPng?: string;
    pathPrimaryLogoSvg?: string;
    pathPrimaryLogoDefaultPng?: string;
    pathPrimaryLogoSelectedPng?: string;
}
export interface NavigationInfo {
    version: number;
    mainNavigation: NavigationAppInfo[];
    shortcutNavigation: NavigationAppInfo[];
}