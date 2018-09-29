import React from 'react';

import { shallow } from 'enzyme';

import { SoundBoardSelection } from '..';

describe('SoundBoardSelection component', () => {
  it('renders sound board label', () => {
    const onBoardSelect = jest.fn();
    const comp = shallow(
      <SoundBoardSelection
        activeBoard={null}
        boards={[
          {
            uuid: 'foo',
            name: 'xxx',
          },
        ]}
        onBoardSelect={onBoardSelect}
      />
    );
    expect(comp.dive().find('WithStyles(SoundBoardLabel)')).toHaveProp('board', {
      uuid: 'foo',
      name: 'xxx',
    });
  });

  it('triggers onBoardSelect board button click with board uuid', () => {
    const onBoardSelect = jest.fn();
    const comp = shallow(
      <SoundBoardSelection
        activeBoard={null}
        boards={[
          {
            uuid: 'foo',
            name: 'xxx',
          },
          {
            uuid: 'bar',
            name: 'yyy',
          },
        ]}
        onBoardSelect={onBoardSelect}
      />
    );
    comp.dive().find('WithStyles(ToggleButtonGroup)').simulate('change', {}, 'foo');
    expect(onBoardSelect).toHaveBeenCalledWith('foo');
  });

  it('triggers onBoardSelect board button click with active board uuid when value is null', () => {
    const onBoardSelect = jest.fn();
    const comp = shallow(
      <SoundBoardSelection
        activeBoard="foo"
        boards={[
          {
            uuid: 'foo',
            name: 'xxx',
          },
          {
            uuid: 'bar',
            name: 'yyy',
          },
        ]}
        onBoardSelect={onBoardSelect}
      />
    );
    comp.dive().find('WithStyles(ToggleButtonGroup)').simulate('change', {}, null);
    expect(onBoardSelect).toHaveBeenCalledWith('foo');
  });
});
