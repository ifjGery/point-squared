import { v4 as uuid } from 'uuid';

// tags
export interface Tag {
    _id: string,
    name: string;
};

export type TagCollection = {
    [key: string]: Tag;
};

const tags : TagCollection = {};

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

const states: StateGoupCollection = {};

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

const items: ItemCollection = {};

const getItems = (): ItemCollection => items;

const createItem = (name: string, baseState: StateGroup): Item => {
    const key = uuid();
    const defaultState = Object.entries(baseState.states).filter(([,one]) => one.default === true).map(([,one]) => one)[0]?._id || "";
    items[key] = { _id: key, name, tags: new Set<string>(), baseState: baseState._id, currentState: defaultState};
    return items[key];
}

const addTagToItem = (item: Item, tag: Tag) => {
    item.tags.add(tag._id);
}

const setItemState = (item: Item, state: State) => {
    item.currentState = state._id;
}

export const api = {
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

