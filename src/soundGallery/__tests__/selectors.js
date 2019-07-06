import { getGallerySoundList } from '..'

describe('soundGallery getGallerySoundList selector', () => {
  it('returns item with multiple relevant tags', () => {
    const state = {
      entities: {
        sounds: [
          {
            uuid: 'vroom1',
            file: 'vroom1',
            name: 'vroom1',
            tags: ['alien', 'spaceship']
          },
          {
            uuid: 'vroom2',
            file: 'vroom2',
            name: 'vroom2',
            tags: ['spaceship']
          }
        ],
        categories: [],
        tags: [
          {
            name: 'alien',
            title: {
              en: 'Alien'
            }
          },
          {
            name: 'spaceship',
            title: {
              en: 'Spaceship'
            }
          }
        ]
      },
      soundGallery: {
        search: {
          search: 'ALIEN SPACESHIP'
        }
      }
    }
    expect(getGallerySoundList(state)).toEqual([
      expect.objectContaining({
        uuid: 'vroom1',
        file: 'vroom1',
        name: 'vroom1',
        tags: ['alien', 'spaceship']
      })
    ])
  })
})
