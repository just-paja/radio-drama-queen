import React from 'react';

import { shallow } from 'enzyme';

import { VolumeControl } from '..';

describe('VolumeControl component', () => {
  it('renders volume toggle button', () => {
    const comp = shallow(
      <VolumeControl
        onChange={() => {}}
        onMuteToggle={() => {}}
        volume={0.5}
      />
    ).dive();
    expect(comp.find('VolumeToggleButton')).toHaveLength(1);
  });

  it('renders slider', () => {
    const comp = shallow(
      <VolumeControl
        onChange={() => {}}
        onMuteToggle={() => {}}
        volume={0.5}
      />
    ).dive();
    expect(comp.find('WithStyles(Slider)')).toHaveLength(1);
  });

  it('renders slider with zero value given the sound is muted', () => {
    const comp = shallow(
      <VolumeControl
        onChange={() => {}}
        onMuteToggle={() => {}}
        volume={0.5}
        muted
      />
    ).dive();
    expect(comp.find('WithStyles(Slider)')).toHaveProp('value', 0);
  });

  it('renders slider with actual value given the sound is not muted', () => {
    const comp = shallow(
      <VolumeControl
        onChange={() => {}}
        onMuteToggle={() => {}}
        volume={0.5}
        muted={false}
      />
    ).dive();
    expect(comp.find('WithStyles(Slider)')).toHaveProp('value', 0.5);
  });

  it('triggers onMuteToggle on volume toggle button click', () => {
    const onMuteToggle = jest.fn();
    const comp = shallow(
      <VolumeControl
        onChange={() => {}}
        onMuteToggle={onMuteToggle}
        volume={0.5}
      />
    ).dive();
    comp.find('VolumeToggleButton').simulate('click');
    expect(onMuteToggle).toHaveBeenCalled();
  });

  it('triggers onChange on volume slider change', () => {
    const onChange = jest.fn();
    const comp = shallow(
      <VolumeControl
        onChange={onChange}
        onMuteToggle={() => {}}
        volume={0.5}
      />
    ).dive();
    comp.find('WithStyles(Slider)').simulate('change');
    expect(onChange).toHaveBeenCalled();
  });
});
