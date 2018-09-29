import React from 'react';

import { shallow } from 'enzyme';

import { SoundBoard } from '..';

describe('SoundBoard component', () => {
  it('renders empty message when there are no categories', () => {
    const comp = shallow(
      <SoundBoard
        categories={[]}
        connectDropTarget={nodes => nodes}
      />
    );
    expect(comp.dive()).toContainMatchingElements(1, 'SoundBoardEmptyMessage');
  });

  it('renders board speed dial', () => {
    const comp = shallow(
      <SoundBoard
        categories={[]}
        connectDropTarget={nodes => nodes}
      />
    );
    expect(comp.dive()).toContainMatchingElements(1, 'Connect(SoundBoardSpeedDial)');
  });

  it('renders snackbar open when touch is over and can drop', () => {
    const comp = shallow(
      <SoundBoard
        canDrop
        isOver
        categories={[]}
        connectDropTarget={nodes => nodes}
      />
    );
    expect(comp.dive().find('WithStyles(Snackbar)')).toHaveProp('open', true);
  });

  it('renders snackbar closed when touch is not over and can drop', () => {
    const comp = shallow(
      <SoundBoard
        canDrop
        isOver={false}
        categories={[]}
        connectDropTarget={nodes => nodes}
      />
    );
    expect(comp.dive().find('WithStyles(Snackbar)')).toHaveProp('open', false);
  });

  it('renders snackbar closed when touch is over and can not drop', () => {
    const comp = shallow(
      <SoundBoard
        canDrop={false}
        isOver
        categories={[]}
        connectDropTarget={nodes => nodes}
      />
    );
    expect(comp.dive().find('WithStyles(Snackbar)')).toHaveProp('open', false);
  });

  it('renders create form when given showCreateForm flag', () => {
    const comp = shallow(
      <SoundBoard
        showCreateForm
        categories={[]}
        connectDropTarget={nodes => nodes}
      />
    );
    expect(comp.dive('Connect(ReduxForm(SoundBoardCategoryCreate))')).toHaveLength(1);
  });

  it('does not render create form when not given showCreateForm flag', () => {
    const comp = shallow(
      <SoundBoard
        categories={[]}
        connectDropTarget={nodes => nodes}
      />
    );
    expect(comp.dive().find('Connect(ReduxForm(SoundBoardCategoryCreate))')).toHaveLength(0);
  });

  it('renders category container for category', () => {
    const comp = shallow(
      <SoundBoard
        categories={['foo-uuid']}
        connectDropTarget={nodes => nodes}
      />
    );
    expect(comp.dive().find('WithStyles(SoundBoardCategory)')).toHaveProp('uuid', 'foo-uuid');
  });
});
