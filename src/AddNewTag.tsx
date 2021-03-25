import React, { SyntheticEvent, useState } from 'react';
import { TagCollection, Item } from './service';
import { Dropdown, DropdownItemProps, Input } from 'semantic-ui-react';

interface TagDropdownMenuProps {
    item: Item,
    tags: TagCollection,
    addItemTagCallback: Function
    addNewTag: Function
}


const dropdownStyle = {
    padding: '0.5em',
    paddingRight: '0',
    borderRadius: '2em'
}

const AddNewTag: React.FC<TagDropdownMenuProps> = ({tags, addItemTagCallback, item, addNewTag}) => {
    const [newTagInput, setNewTagInput] = useState<string>('');

    const allTagsOptions = (tags: TagCollection) => Object.values(tags).map(one => ({key: one._id, text: one.name, value: one._id}));

    const onNewTagSelected = (e: SyntheticEvent<HTMLElement, MouseEvent>, data: DropdownItemProps) => {
        addItemTagCallback(item, data.value)
    }

    const addTag = () => {
        const newId = addNewTag(newTagInput);
        addItemTagCallback(item, newId);
        setNewTagInput('');
    }

    const onKeyListener = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addTag();
        }
        if (e.keyCode === 32) {
            e.stopPropagation();
        }
    }

    return (
        <Dropdown icon='add' button compact style={dropdownStyle} >
            <Dropdown.Menu>
                <Input 
                    action={{
                        icon: 'plus',
                        onClick: addTag
                    }}
                    onClick={(e : MouseEvent) => e.stopPropagation()} 
                    value={newTagInput} 
                    onChange={e => setNewTagInput(e.target.value)} 
                    onKeyDown={onKeyListener}
                    onKeyUp={onKeyListener}
                    placeholder='add new tag'
                />
                <Dropdown.Menu scrolling>
                    {allTagsOptions(tags).map(option => <Dropdown.Item key={option.key} onClick={onNewTagSelected} {...option} />)}
                </Dropdown.Menu>
            </Dropdown.Menu>
        </Dropdown>
    );
}

export default AddNewTag;