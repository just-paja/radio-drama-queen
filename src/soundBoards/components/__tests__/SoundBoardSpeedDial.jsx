import React from 'react';

import { shallow } from 'enzyme';

import { SoundBoardSpeedDial } from '..';

describe('SoundBoardSpeedDial component', () => {
  it('triggers onBoardCreate on create board action click', () => {
    const onBoardCreate = jest.fn();
    const comp = shallow(
      <SoundBoardSpeedDial
        categories={[]}
        onBoardCreate={onBoardCreate}
        onCategoryCreate={() => {}}
      />
    );
    comp.find('[tooltipTitle="Create Board"]').simulate('click')
    expect(onBoardCreate).toHaveBeenCalled();
  });

  it('triggers onCategoryCreate on create board action click', () => {
    const onCategoryCreate = jest.fn();
    const comp = shallow(
      <SoundBoardSpeedDial
        categories={[]}
        onBoardCreate={() => {}}
        onCategoryCreate={onCategoryCreate}
      />
    );
    comp.find('[tooltipTitle="Create Category"]').simulate('click')
    expect(onCategoryCreate).toHaveBeenCalled();
  });
});
