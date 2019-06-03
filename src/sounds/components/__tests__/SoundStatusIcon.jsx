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
    expect(comp).toContainMatchingElement('ErrorIcon');
  });

  it('renders stop icon given the sound is playing', () => {
    const comp = shallow(
      <SoundStatusIcon
        playing
        valid
      />
    );
    expect(comp).toContainMatchingElement('StopIcon');
  });

  it('renders disabled icon given the sound is not valid', () => {
    const comp = shallow(
      <SoundStatusIcon
        playing
        valid={false}
      />
    );
    expect(comp).toContainMatchingElement('NotInterestedIcon');
  });

  it('renders play arrow icon given the sound is not playing and has no error', () => {
    const comp = shallow(
      <SoundStatusIcon valid />
    );
    expect(comp).toContainMatchingElement('PlayArrowIcon');
  });

  it('renders loader given the sound is loading', () => {
    const comp = shallow(
      <SoundStatusIcon loading />
    );
    expect(comp).toContainMatchingElement('WithStyles(ForwardRef(CircularProgress))');
  });
});
