import React from 'react';
import withDragDropContext from './DndHelper';
import './index.less';
import { EditNavigationDragItem } from './EditNavigationDragItem';
import { NavigationAppInfo } from './typings'

interface EditNavigationState {
    navigations: NavigationAppInfo[];
}

class EditNavigationModal extends React.Component<{}, EditNavigationState> {
    constructor(props: any) {
        super(props);
        this.state = {
            navigations: [
                {
                    name: '小王',
                    id: 1
                },
                {
                    name: '小张',
                    id: 2
                },
                {
                    name: '小红',
                    id: 3
                },
                {
                    name: '小品',
                    id: 4
                }
            ]
        };
    }

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
        const { navigations } = this.state;
        return (
            <ul>
                {
                    navigations.map((v, index) => (
                        <EditNavigationDragItem
                            key={`item_${v.id}`}
                            index={index}
                            name={v.name}
                            hoverCallback={this._filterItem}
                        >
                        </EditNavigationDragItem>)
                    )
                }
            </ul>

    );
    }
}
export default withDragDropContext(EditNavigationModal);
