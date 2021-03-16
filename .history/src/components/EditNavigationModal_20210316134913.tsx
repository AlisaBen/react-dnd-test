import React from 'react';
import withDragDropContext from './DndHelper';
import './index.less';
import { EditNavigationDragItem } from './EditNavigationDragItem';
import { NavigationAppInfo, NavigationInfo } from './typings'

interface EditNavigationState {
    navigations: NavigationAppInfo[];
}
interface EditNavigationModalProps {
    changeSize?: any;
    closeModal: () => void;
}

class EditNavigationModal extends React.Component<EditNavigationModalProps, EditNavigationState> {
    constructor(props: EditNavigationModalProps) {
        super(props);
        this.state = {
            navigations: []
        };
        this._getNavigationInfo();
    }

    private _getNavigationInfo = async () => {
        const navigationInfo: NavigationInfo = { version: 0, mainNavigation: [], shortcutNavigation: []};
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


    render() {
        const { changeSize } = this.props;
        const { navigations } = this.state;
        return (
            navigations.map((v, index) => (
                <EditNavigationDragItem
                    key={`item_${v.type}_${v.id}`}
                    index={index}
                    name={v.name}
                    hoverCallback={this._filterItem}
                    setTop={false}
                >
                </EditNavigationDragItem>)
            )
    );
    }
}
export default withDragDropContext(EditNavigationModal);
