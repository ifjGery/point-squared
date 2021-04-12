import { v4 as uuid } from 'uuid';

// tags
export interface Tag {
    _id: string,
    name: string;
};

export type TagCollection = {
    [key: string]: Tag;
};

let tags : TagCollection = {};

const getTags = () : TagCollection => tags;

const createTag = (name: string): Tag => {
    const key = uuid();
    tags[key] = { _id: key, name };
    return tags[key];
}

// states
export interface State {
    _id: string,
    name: string,
    edges: Set<string>
    default?: boolean
};

export type StateCollection = {
    [key: string]: State;
};

export interface StateGroup {
    _id: string,
    name: string,
    states: StateCollection
};

export type StateGoupCollection = {
    [key: string]: StateGroup
}

let states: StateGoupCollection = {};

const getStateAll = () => states;

const getStateGroup = (key : string): StateGroup | null => states[key] || null;

const isStateInStateGroup = (group : StateGroup, needle : string): boolean => 
    !!Object.entries(group)
    .filter( ([key,]) => key === needle).length;

const findStateGroupByState = (needle: string): Array<StateGroup> => 
    Object.entries(states)
    .filter(([,one]) => isStateInStateGroup(one, needle))
    .map(([key,]) => states[key]);

const getStateFromGroup = (group: StateGroup, key: string): State | null =>
    states[group._id]?.states[key] || null;

const createStateGroup = (name: string): StateGroup => {
    const key = uuid();
    states[key] = { _id: key, name, states: {}};
    return states[key];
}

const createState = (group: StateGroup, name: string): State => {
    const key = uuid();
    group.states[key] = { _id: key, name, edges: new Set<string>() };
    return group.states[key];
}

const setStateAsDefault = (state: State) => {
    state.default = true;
}

const createStateEdge = (state: State, edge: State) => {
    state.edges.add(edge._id);
}

// items
export interface Item {
    _id: string,
    name: string,
    tags: Set<string>,
    baseState: string,
    currentState: string
};

export type ItemCollection = {
    [key: string]: Item
};

let items: ItemCollection = {};

const getItems = (): ItemCollection => items;

const createItem = (name: string, baseState: StateGroup): Item => {
    const key = uuid();
    const possibleStates = Object.entries(baseState.states)
    const defaultState = possibleStates
        .filter(([,one]) => one.default === true)
        .map(([,one]) => one)[0]?._id || 
        possibleStates[0][1]._id;
    items[key] = { _id: key, name, tags: new Set<string>(), baseState: baseState._id, currentState: defaultState};
    return items[key];
}

const addTagToItem = (item: Item, tag: Tag) => {
    item.tags.add(tag._id);
}

const setItemState = (item: Item, state: State) => {
    item.currentState = state._id;
}

const init = (input: any) => {
    for (const [key, value] of Object.entries(input.items as ItemCollection)) {
        items[key] = {...value, tags: new Set(value.tags)};
    }

    for (const [groupKey, groupValue] of Object.entries(input.states as StateGoupCollection)) {
        let localStates: StateCollection = {};
        for (const [stateKey, stateValue] of Object.entries(groupValue.states as StateCollection)) {
            localStates[stateKey] = {...stateValue, edges: new Set(stateValue.edges)};
        }
        states[groupKey] = {...groupValue, states: {...localStates}};
    }

    tags = input.tags;
}

export const api = {
    init,
    getTags,
    createTag,
    getStateAll,
    getStateGroup,
    getStateFromGroup,
    setStateAsDefault,
    createState,
    createStateGroup,
    createStateEdge,
    getItems,
    createItem,
    addTagToItem,
    setItemState
};

