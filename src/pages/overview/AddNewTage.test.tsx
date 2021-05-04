import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import AddNewTag from './AddNewTag';

const NEW_TAG = 'NEW_TAG';

const tagsMockData = {
  key: {
    _id: 'id',
    name: 'name',
  },
};

const itemMockData = {
  _id: 'id',
  name: 'name',
  tags: new Set(['tag']),
  baseState: 'baseState',
  currentState: 'currentState',
};

const addItemTagCallbackMock = jest.fn();
const addNewTagMock = jest.fn();

beforeEach(() => {
  addItemTagCallbackMock.mockClear();
  addNewTagMock.mockClear();
});

test('ItemCreator adds a tag', () => {
  // given
  const { container } = render(<AddNewTag
    item={itemMockData}
    tags={tagsMockData}
    addItemTagCallback={addItemTagCallbackMock}
    addNewTag={addNewTagMock}
  />);

  // when
  fireEvent.click(container.querySelector('.add.icon'));
  fireEvent.click(screen.getByText('name'));

  // then
  expect(addItemTagCallbackMock).toBeCalledTimes(1);
  expect(addItemTagCallbackMock).toBeCalledWith(itemMockData, 'id');
});

test('ItemCreator creates a tag', () => {
  // given
  addNewTagMock.mockReturnValue(NEW_TAG);

  const { container } = render(<AddNewTag
    item={itemMockData}
    tags={tagsMockData}
    addItemTagCallback={addItemTagCallbackMock}
    addNewTag={addNewTagMock}
  />);

  // when
  fireEvent.click(container.querySelector('.add.icon'));

  const input = screen.getByPlaceholderText('add new tag');
  fireEvent.change(input, { target: { value: NEW_TAG } });

  fireEvent.click(container.querySelector('.plus.icon'));

  // then
  expect(addNewTagMock).toBeCalledTimes(1);
  expect(addNewTagMock).toBeCalledWith(NEW_TAG);
  expect(addItemTagCallbackMock).toBeCalledTimes(1);
  expect(addItemTagCallbackMock).toBeCalledWith(itemMockData, NEW_TAG);
});
