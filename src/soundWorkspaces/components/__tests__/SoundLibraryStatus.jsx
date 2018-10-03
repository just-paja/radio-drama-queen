import React from 'react';

import { shallow } from 'enzyme';

import { SoundLibraryStatus } from '..';

describe('SoundLibraryStatus component', () => {
  it('renders playing sounds count', () => {
    const comp = shallow(
      <SoundLibraryStatus
        boardSounds={0}
        errorSounds={0}
        inMemorySounds={0}
        playingSounds={10}
        registeredSounds={0}
        tags={0}
      />
    );
    expect(comp.dive()).toIncludeText('10');
  });

  it('renders registered sounds count', () => {
    const comp = shallow(
      <SoundLibraryStatus
        boardSounds={0}
        errorSounds={0}
        inMemorySounds={0}
        playingSounds={0}
        registeredSounds={11}
        tags={11}
      />
    );
    expect(comp.dive()).toIncludeText('11');
  });

  it('renders board sounds count', () => {
    const comp = shallow(
      <SoundLibraryStatus
        boardSounds={12}
        errorSounds={0}
        inMemorySounds={0}
        playingSounds={0}
        registeredSounds={0}
        tags={0}
      />
    );
    expect(comp.dive()).toIncludeText('12');
  });

  it('renders error sounds count', () => {
    const comp = shallow(
      <SoundLibraryStatus
        boardSounds={0}
        errorSounds={13}
        inMemorySounds={0}
        playingSounds={0}
        registeredSounds={0}
        tags={0}
      />
    );
    expect(comp.dive()).toIncludeText('13');
  });

  it('renders in memory sounds count', () => {
    const comp = shallow(
      <SoundLibraryStatus
        boardSounds={0}
        errorSounds={14}
        inMemorySounds={0}
        playingSounds={0}
        registeredSounds={0}
        tags={0}
      />
    );
    expect(comp.dive()).toIncludeText('14');
  });

  it('renders tag count', () => {
    const comp = shallow(
      <SoundLibraryStatus
        boardSounds={0}
        errorSounds={14}
        inMemorySounds={0}
        playingSounds={0}
        registeredSounds={0}
        tags={15}
      />
    );
    expect(comp.dive()).toIncludeText('15');
  });
});
