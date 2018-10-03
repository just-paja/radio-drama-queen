import React from 'react';

import { shallow } from 'enzyme';

import { SoundStatusIcon } from '..';

describe('SoundStatusIcon component', () => {
  it('renders error icon given the sound has an error', () => {
    const comp = shallow(
      <SoundStatusIcon
        error={new Error('Test!')}
      />
    );
    expect(comp.find('pure(ErrorIcon)')).toHaveLength(1);
  });

  it('renders stop icon given the sound is playing', () => {
    const comp = shallow(
      <SoundStatusIcon
        playing
      />
    );
    expect(comp.find('pure(StopIcon)')).toHaveLength(1);
  });

  it('renders play arrow icon given the sound is not playing and has no error', () => {
    const comp = shallow(
      <SoundStatusIcon />
    );
    expect(comp.find('pure(PlayArrowIcon)')).toHaveLength(1);
  });

  it('renders loader given the sound is loading', () => {
    const comp = shallow(
      <SoundStatusIcon loading />
    );
    expect(comp.find('WithStyles(CircularProgress)')).toHaveLength(1);
  });
});
