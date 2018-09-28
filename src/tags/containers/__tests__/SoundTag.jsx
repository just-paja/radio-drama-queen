import React from 'react';

import { shallow } from 'enzyme';

import SoundTag from '../SoundTag';

import { mockStore } from '../../../../mock';

describe('SoundTag container', () => {
  let store;
  let comp;

  beforeEach(() => {
    const state = {
      tags: {
        list: [
          {
            name: 'foo',
            title: {
              en: 'Test tag',
            },
          },
        ],
      },
    };
    store = mockStore(state);
    comp = shallow(<SoundTag tag="foo" />, {
      context: {
        store,
      },
    });
  });

  it('provides sounds', () => {
    expect(comp).toHaveProp('tag', {
      name: 'foo',
      title: {
        en: 'Test tag',
      },
    });
  });
});
