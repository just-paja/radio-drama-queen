import { getTags, getTagByName } from '..'

describe('tags selectors', () => {
  it('getTags returns tag list', () => {
    expect(getTags({
      soundTags: {
        list: [
          {
            name: 'foo'
          }
        ]
      }
    })).toEqual([
      {
        name: 'foo'
      }
    ])
  })

  it('getTagByName returns tag of passed name', () => {
    const state = {
      soundTags: {
        list: [
          {
            name: 'foo',
            title: {
              en: 'Foo'
            }
          },
          {
            name: 'bar',
            title: {
              en: 'Bar'
            }
          }
        ]
      }
    }
    expect(getTagByName(state, 'foo')).toEqual({
      name: 'foo',
      title: {
        en: 'Foo'
      }
    })
  })
})
