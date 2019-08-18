import jetpack from 'fs-jetpack'

import { readSoundMetaData } from '../readSoundMetaData'

describe('readSoundMetaData worker', () => {
  describe('with mp3', () => {
    it('returns ID3v1 title tag as sound name', () => {
      return readSoundMetaData({
        path: jetpack.path(__dirname, 'fixtures', 'id3-v1-title.mp3'),
        cachePath: jetpack.path(__dirname, 'fixtures', 'id3-v1-title.mp3')
      }).then((sound) => {
        expect(sound).toMatchObject({
          name: 'ID3 v1 Title'
        })
      })
    })

    it('returns ID3v2 title tag as sound name given title is truthy', () => {
      return readSoundMetaData({
        path: jetpack.path(__dirname, 'fixtures', 'id3-mixed-title.mp3'),
        cachePath: jetpack.path(__dirname, 'fixtures', 'id3-mixed-title.mp3')
      }).then((sound) => {
        expect(sound).toMatchObject({
          name: 'ID3 v2 Title'
        })
      })
    })

    it('returns ID3v2 title tag as sound name given v1 and v2 titles are truthy', () => {
      return readSoundMetaData({
        path: jetpack.path(__dirname, 'fixtures', 'id3-v2-title.mp3'),
        cachePath: jetpack.path(__dirname, 'fixtures', 'id3-v2-title.mp3')
      }).then((sound) => {
        expect(sound).toMatchObject({
          name: 'ID3 v2 Title'
        })
      })
    })

    it('returns sound file name as sound name given title is falsy', () => {
      return readSoundMetaData({
        path: jetpack.path(__dirname, 'fixtures', 'no-tags.mp3'),
        cachePath: jetpack.path(__dirname, 'fixtures', 'no-tags.mp3')
      }).then((sound) => {
        expect(sound).toMatchObject({
          name: 'no-tags'
        })
      })
    })

    it('returns ID3v1 comment tag as sound comment', () => {
      return readSoundMetaData({
        path: jetpack.path(__dirname, 'fixtures', 'id3-v1-comment.mp3'),
        cachePath: jetpack.path(__dirname, 'fixtures', 'id3-v1-comment.mp3')
      }).then((sound) => {
        expect(sound).toMatchObject({
          tags: [
            expect.objectContaining({ title: 'ID3 v1 Comment' }),
            expect.objectContaining({ title: 'Extra words' })
          ]
        })
      })
    })

    it('returns ID3v2 comment tag as sound comment', () => {
      return readSoundMetaData({
        path: jetpack.path(__dirname, 'fixtures', 'id3-v2-comment.mp3'),
        cachePath: jetpack.path(__dirname, 'fixtures', 'id3-v2-comment.mp3')
      }).then((sound) => {
        expect(sound).toMatchObject({
          tags: [
            expect.objectContaining({ title: 'ID3 v2 Comment' }),
            expect.objectContaining({ title: 'Extra words' })
          ]
        })
      })
    })

    it('returns mixed comment tag as comment given v1 and v2 comments are truthy', () => {
      return readSoundMetaData({
        path: jetpack.path(__dirname, 'fixtures', 'id3-mixed-comment.mp3'),
        cachePath: jetpack.path(__dirname, 'fixtures', 'id3-mixed-comment.mp3')
      }).then((sound) => {
        expect(sound).toMatchObject({
          tags: [
            expect.objectContaining({ title: 'ID3 v2 Comment' }),
            expect.objectContaining({ title: 'Extra words' }),
            expect.objectContaining({ title: 'ID3 v1 Comment' })
          ]
        })
      })
    })
  })
})
