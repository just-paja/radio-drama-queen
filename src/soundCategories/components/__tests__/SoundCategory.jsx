import React from 'react';

import { shallow } from 'enzyme';

import { SoundCategory } from '..';

describe('SoundCategory component', () => {
  it('renders category name', () => {
    const comp = shallow(
      <SoundCategory
        connectDropTarget={children => children}
        name="Test category"
        sounds={[]}
        uuid="category-1"
      />
    ).dive();
    expect(comp.find('[children="Test category"]')).toHaveLength(1);
  });

  it('renders string default when category does not have a name', () => {
    const comp = shallow(
      <SoundCategory
        connectDropTarget={children => children}
        sounds={[]}
        uuid="category-1"
      />
    ).dive();
    expect(comp.find('[children="Default"]')).toHaveLength(1);
  });

  it('renders category sounds', () => {
    const comp = shallow(
      <SoundCategory
        connectDropTarget={children => children}
        sounds={['sound-1']}
        uuid="category-1"
      />
    ).dive();
    expect(comp.find('Connect(SoundCategoryItem)')).toHaveProp('uuid', 'sound-1');
  });

  it('renders controls with category uuid', () => {
    const comp = shallow(
      <SoundCategory
        connectDropTarget={children => children}
        sounds={['sound-1']}
        uuid="category-1"
      />
    ).dive();
    expect(comp.find('Connect(SoundCategoryControls)')).toHaveProp('uuid', 'category-1');
  });

  it('renders open snackbar when drag is over and can be dropped', () => {
    const comp = shallow(
      <SoundCategory
        canDrop
        isOver
        connectDropTarget={children => children}
        sounds={['sound-1']}
        uuid="category-1"
      />
    ).dive();
    expect(comp.find('WithStyles(Snackbar)')).toHaveProp('open', true);
  });
});
