import React from 'react';

import { mount } from 'enzyme';

import { SoundStatusIcon } from '..';

describe('SoundStatusIcon component', () => {
  it('renders error icon given the sound has an error', () => {
    const comp = mount(
      <SoundStatusIcon
        error={new Error('Test!')}
      />
    );
    expect(comp.find('pure(ErrorIcon)')).toHaveLength(1);
  });

  it('renders stop icon given the sound is playing', () => {
    const comp = mount(
      <SoundStatusIcon
        playing
        valid
      />
    );
    expect(comp.find('pure(StopIcon)')).toHaveLength(1);
  });

  it('renders disabled icon given the sound is not valid', () => {
    const comp = mount(
      <SoundStatusIcon
        playing
        valid={false}
      />
    );
    expect(comp.find('pure(NotInterestedIcon)')).toHaveLength(1);
  });

  it('renders play arrow icon given the sound is not playing and has no error', () => {
    const comp = mount(
      <SoundStatusIcon valid />
    );
    expect(comp).toBe('PlayArrowIcon');
  });

  it('renders loader given the sound is loading', () => {
    const comp = mount(
      <SoundStatusIcon loading />
    );
    expect(comp).toContainMatchingElement('ForwardRef(CircularProgress)');
  });
});
