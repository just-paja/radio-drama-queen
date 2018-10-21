import React from 'react';

import { shallow } from 'enzyme';

import { SoundCategoryStopButton } from '..';

describe('SoundCategoryStopButton component', () => {
  it('renders in primary color given it is playing', () => {
    const comp = shallow(
      <SoundCategoryStopButton
        onClick={() => {}}
        playing
      />
    );
    expect(comp.find('WithStyles(SoundCategoryIconButton)')).toHaveProp('color', 'primary');
  });

  it('renders in default color given it is not playing', () => {
    const comp = shallow(
      <SoundCategoryStopButton
        onClick={() => {}}
        playing={false}
      />
    );
    expect(comp.find('WithStyles(SoundCategoryIconButton)')).toHaveProp('color', 'default');
  });

  it('renders enabled given it is playing', () => {
    const comp = shallow(
      <SoundCategoryStopButton
        onClick={() => {}}
        playing
      />
    );
    expect(comp.find('WithStyles(SoundCategoryIconButton)')).toHaveProp('disabled', false);
  });

  it('renders disabled given it is not playing', () => {
    const comp = shallow(
      <SoundCategoryStopButton
        onClick={() => {}}
        playing={false}
      />
    );
    expect(comp.find('WithStyles(SoundCategoryIconButton)')).toHaveProp('disabled', true);
  });
});
