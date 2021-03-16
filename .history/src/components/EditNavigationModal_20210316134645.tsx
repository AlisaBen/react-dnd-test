import React from 'react';
import '@byted/lark-js-widget/lib/modal-wrapper/ModalWrapper.less';
import ModalWrapper from '@byted/lark-js-widget/lib/modal-wrapper/NotFooterModalWrapper';
import Button, { ButtonGroup } from '@lark/components/es/components/Button';
import withDragDropContext from './DndHelper';
import SubmitButton from '@lark/messenger-sdk/es/base/widget/SubmitButton';
import { ResizeObserverModalWrapper } from '@lark/widgets/es/widgets/resize-observer-modal-wrapper';
import {
    getNavigationInfo,
    setNavigationInfo,
    NavigationInfo,
    NavigationAppInfo
} from '@lark/services/es/navigation';
import * as analytics from '@lark/services/es/analytics';
import { Homeric } from '@lark/Homeric';
import './index.less';
import { EditNavigationDragItem } from './EditNavigationDragItem';
import IconLoad from './IconLoad';
interface EditNavigationState {
    navigations: NavigationAppInfo[];
}
interface EditNavigationModalProps {
    changeSize?: any;
    closeModal: () => void;
}

const MAIN_NAVIGATION_LIMIT = 6;
const CLOSE_DELAY = 200; // 防止埋点上报失败
class EditNavigationModal extends React.Component<EditNavigationModalProps, EditNavigationState> {
    constructor(props: EditNavigationModalProps) {
        super(props);
        this.state = {
            navigations: []
        };
        this._getNavigationInfo();
    }

    private _getNavigationInfo = async () => {
        const navigationInfo: NavigationInfo = await getNavigationInfo();
        const { mainNavigation, shortcutNavigation } = navigationInfo;
        this.setState({
            navigations: [
                ...mainNavigation.filter(item => item.name),
                ...shortcutNavigation.filter(item => item.name)
            ]
        });
    };

    // 实现拖拽功能，通过重新渲染state，实现react-dnd组件的重排序
    private _filterItem = (dragIndex: number, hoverIndex: number): void => {
        if (hoverIndex !== dragIndex) {
            const { navigations } = this.state;
            const filter = navigations[dragIndex];
            navigations.splice(dragIndex, 1);
            navigations.splice(hoverIndex, 0, filter);
            this.setState({ navigations });
        }
    };

    private _confirmEdit = async () => {
        const { navigations } = this.state;
        const mainNavigation = navigations.slice(0, MAIN_NAVIGATION_LIMIT);
        const shortcutNavigation = navigations.slice(MAIN_NAVIGATION_LIMIT, navigations.length);
        const newData = {
            version: 0,
            mainNavigation,
            shortcutNavigation
        };
        setNavigationInfo(newData);
        analytics.trackImmediate(Homeric.NAVIGATION_MORE_EDIT_DONE);
        setTimeout(this.props.closeModal, CLOSE_DELAY); // 延迟关闭弹窗，上报埋点
    };

    private _closeModal = () => {
        analytics.trackImmediate(Homeric.NAVIGATION_MORE_EDIT_CANCEL);
        setTimeout(this.props.closeModal, CLOSE_DELAY);
    };
    render() {
        const { changeSize } = this.props;
        const { navigations } = this.state;
        return (
        <ModalWrapper
            loading={true}
            visible={true}
            width={600}
            showCloseIcon={true}
            title={__t('Lark_Legacy_NavigationUserAdjust')}
            description={__t('Lark_Legacy_NavigationUserDragDropReorder')}
            closeModal={this._closeModal}
            isWrapCenter={false} // 默认值会导致弹窗不正常resize
        >
            <ResizeObserverModalWrapper changeSize={changeSize}>
                <ul className="edit-navi-body">
                    {
                    navigations.map((v, index) => (
                        <EditNavigationDragItem
                            key={`item_${v.type}_${v.id}`}
                            index={index}
                            name={v.name}
                            hoverCallback={this._filterItem}
                            setTop={false}
                        >
                            <IconLoad
                                key={`icon_${v.type}_${v.id}`}
                                pathShortcutLogoPng={v.pathShortcutLogoPng}
                                urlShortcutLogoPng={v.urlShortcutLogoPng}
                            />
                        </EditNavigationDragItem>)
                    )
                    }
                </ul>
                <ButtonGroup className="button-group">
                    <Button className="cancel-button" onClick={this._closeModal}>取消</Button>
                    <SubmitButton
                        className="submit-button"
                        disabled={false}
                        onSubmit={this._confirmEdit}
                        submitText="确定"
                    />
                </ButtonGroup>
            </ResizeObserverModalWrapper>
        </ModalWrapper>
    );
    }
}
export default withDragDropContext(EditNavigationModal);
