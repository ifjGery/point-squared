import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import ItemCreator from './ItemCreator';
import { api } from '../../service';

const GROUP_NAME = 'TEST_GROUP';

const stateGroupMockData = {
  _id: GROUP_NAME,
  name: GROUP_NAME,
  states: {},
};

const itemPartialData = {
  _id: 'test',
  tags: new Set(['test']),
  baseState: 'base',
  currentState: 'test',
};

let mockCreateItem : jest.SpyInstance = null;
let mockGetStateGroup : jest.SpyInstance = null;
let addItemMock : jest.Mock = null;

beforeEach(() => {
  mockCreateItem = jest.spyOn(api, 'createItem');
  mockGetStateGroup = jest.spyOn(api, 'getStateGroup');
  addItemMock = jest.fn();

  mockCreateItem.mockImplementation((name) => ({
    ...itemPartialData,
    name,
  }));

  mockGetStateGroup.mockReturnValue(stateGroupMockData);
});

afterEach(() => {
  mockCreateItem.mockRestore();
  mockGetStateGroup.mockRestore();
});

test('ItemCreator functions properly', () => {
  render(<ItemCreator addItem={addItemMock} stateGroups={{ TEST_GROUP: stateGroupMockData }} />);

  const input = screen.getByPlaceholderText('item name');
  fireEvent.change(input, { target: { value: 'TEST_VALUE' } });

  screen.getAllByText(GROUP_NAME);
  fireEvent.click(screen.getByText('Add Item'));
  expect(mockCreateItem).toHaveBeenCalledWith('TEST_VALUE', stateGroupMockData);
  expect(addItemMock).toHaveBeenCalledTimes(1);
});
