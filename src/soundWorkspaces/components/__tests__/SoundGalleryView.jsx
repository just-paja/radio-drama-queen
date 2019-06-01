import React from 'react';

import { shallow } from 'enzyme';

import { SoundGalleryView } from '..';

describe('SoundGalleryView component', () => {
  it('renders sound gallery', () => {
    const comp = shallow(
      <SoundGalleryView
        onAddSoundToBoard={() => {}}
        onAddTagToBoard={() => {}}
        onBoardCreate={() => {}}
        onConfigOpen={() => {}}
        onGalleryGoBack={() => {}}
        onLibraryOpen={() => {}}
      />
    );
    expect(comp).toContainMatchingElements(1, 'Connect(SoundGallery)');
  });
});
