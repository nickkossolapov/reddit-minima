import * as React from 'react';
import * as enzyme from 'enzyme';
import Search from './search';

const mockSetSubreddit = jest.fn((newValue: string) => {});

it('renders no value', () => {
  const search = enzyme.shallow(<Search setSubreddit={mockSetSubreddit}/>);
  const input = search.find(".search-input");
  expect(input.props().value).toEqual('');
});

it('can update value', () => {
  const search = enzyme.mount(<Search setSubreddit={mockSetSubreddit}/>);
  const input = search.find(".search-input");

  input.simulate('change', {target: {value: 'changed'}});
  expect(search.state('value')).toEqual('changed');
});

it('can update subreddit with test', () => {
  const search = enzyme.mount(<Search setSubreddit={mockSetSubreddit}/>);
  const input = search.find(".search-input");
  input.simulate('change', {target: {value: 'test'}});

  const form = search.find(".search-form");
  form.simulate('submit');
  expect(mockSetSubreddit).toBeCalledWith("test");
});