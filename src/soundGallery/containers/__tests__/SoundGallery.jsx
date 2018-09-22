import React from 'react';

import { shallow } from 'enzyme';

import SoundGallery from '../SoundGallery';

import { mockStore } from '../../../../mock';

describe('SoundGallery container', () => {
  let store;
  let comp;

  beforeEach(() => {
    const state = {
      sounds: {
        list: [
          {
            name: 'foo',
            uuid: 'foo',
            tags: [],
          },
        ],
      },
    };
    store = mockStore(state);
    comp = shallow(<SoundGallery />, {
      context: {
        store,
      },
    });
  });

  it('provides sounds', () => {
    expect(comp).toHaveProp('sounds');
  });
});
