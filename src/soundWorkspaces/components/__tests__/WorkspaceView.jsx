import React from 'react';

import { shallow } from 'enzyme';

import { WorkspaceView } from '..';

describe('WorkspaceView component', () => {
  it('renders sound gallery when viewing library', () => {
    const comp = shallow(
      <WorkspaceView
        onAddSoundToBoard={() => {}}
        onAddTagToBoard={() => {}}
        view="VIEW_LIBRARY"
      />
    );
    expect(comp).toContainMatchingElements(1, 'Connect(SoundGallery)');
  });

  it('renders sound board when viewing sound boards', () => {
    const comp = shallow(
      <WorkspaceView
        board="test123"
        onAddSoundToBoard={() => {}}
        onAddTagToBoard={() => {}}
        view="VIEW_BOARD"
      />
    );
    expect(comp).toContainMatchingElements(1, 'Connect(SoundBoard)');
  });

  it('renders empty when given board view but no board', () => {
    const comp = shallow(
      <WorkspaceView
        onAddSoundToBoard={() => {}}
        onAddTagToBoard={() => {}}
        view="VIEW_BOARD"
      />
    );
    expect(comp).toBeEmptyRender();
  });

  it('renders empty when given no view', () => {
    const comp = shallow(
      <WorkspaceView
        onAddSoundToBoard={() => {}}
        onAddTagToBoard={() => {}}
      />
    );
    expect(comp).toBeEmptyRender();
  });
});
