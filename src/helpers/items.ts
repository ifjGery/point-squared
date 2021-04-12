import {Item} from '../service';

const addItem = (prevState: any, item: Item) => {
    return ({
        ...prevState, 
        items: {
            ...prevState.items, 
            [item._id]: item
        }
    });
};