import React, { Fragment } from 'react';
import { Button, Dropdown, Input } from 'semantic-ui-react';
import { api } from './service';

const ItemCreator = () => {
    const stateGroupOptions = Object.entries(api.getStateAll()).map(([key,one]) => ({key, text: one.name, value: key}));

    return (
        <Fragment>
            <Input label='name' />
            <Dropdown defaultValue={stateGroupOptions[0].key} options={stateGroupOptions} />
            <Button>Add Item</Button>
        </Fragment>
    );
}

export default ItemCreator;