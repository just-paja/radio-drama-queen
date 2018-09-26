import { getGallerySoundListFiltered } from '..';

describe('soundGallery getGallerySoundListFiltered selector', () => {
  it('returns item with multiple relevant tags', () => {
    const state = {
      sounds: {
        list: [
          {
            uuid: 'vroom1',
            file: 'vroom1',
            name: 'vroom1',
            tags: ['alien', 'spaceship'],
          },
          {
            uuid: 'vroom2',
            file: 'vroom2',
            name: 'vroom2',
            tags: ['spaceship'],
          },
        ],
      },
      soundGallery: {
        search: {
          search: 'ALIEN SPACESHIP',
        },
      },
      tags: {
        list: [
          {
            name: 'alien',
            title: {
              en: 'Alien',
            },
          },
          {
            name: 'spaceship',
            title: {
              en: 'Spaceship',
            },
          },
        ],
      },
    };
    expect(getGallerySoundListFiltered(state)).toEqual([
      {
        uuid: 'vroom1',
        file: 'vroom1',
        name: 'vroom1',
        tags: ['alien', 'spaceship'],
      },
    ]);
  });
});
