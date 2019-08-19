import jetpack from 'fs-jetpack'

import { readSoundMetaData } from '../readSoundMetaData'

describe('readSoundMetaData worker', () => {
  it('throws exception when called without sound description', () => {
    expect(readSoundMetaData()).rejects.toThrow()
  })

  it('prefers sound cache path over path', () => {
    return readSoundMetaData({
      cachePath: jetpack.path(__dirname, 'fixtures', 'id3-v2-title.mp3'),
      path: jetpack.path(__dirname, 'fixtures', 'no-tags.mp3')
    }).then((sound) => {
      expect(sound).toHaveProperty('name', 'ID3 v2 Title')
    })
  })

  describe('with mp3', () => {
    it('returns sound duration', () => {
      return readSoundMetaData({
        path: jetpack.path(__dirname, 'fixtures', '1.044-second.mp3')
      }).then((sound) => {
        expect(sound).toHaveProperty('duration', 1.044)
      })
    })

    it('returns mp3 as sound format', () => {
      return readSoundMetaData({
        path: jetpack.path(__dirname, 'fixtures', 'format.mp3')
      }).then((sound) => {
        expect(sound).toHaveProperty('format', 'mp3')
      })
    })

    it('returns ID3v1 title tag as sound name', () => {
      return readSoundMetaData({
        path: jetpack.path(__dirname, 'fixtures', 'id3-v1-title.mp3')
      }).then((sound) => {
        expect(sound).toHaveProperty('name', 'ID3 v1 Title')
      })
    })

    it('returns ID3v2 title tag as sound name given title is truthy', () => {
      return readSoundMetaData({
        path: jetpack.path(__dirname, 'fixtures', 'id3-mixed-title.mp3')
      }).then((sound) => {
        expect(sound).toHaveProperty('name', 'ID3 v2 Title')
      })
    })

    it('returns ID3v2 title tag as sound name given v1 and v2 titles are truthy', () => {
      return readSoundMetaData({
        path: jetpack.path(__dirname, 'fixtures', 'id3-v2-title.mp3')
      }).then((sound) => {
        expect(sound).toHaveProperty('name', 'ID3 v2 Title')
      })
    })

    it('returns sound file name as sound name given title is falsy', () => {
      return readSoundMetaData({
        path: jetpack.path(__dirname, 'fixtures', 'no-tags.mp3')
      }).then((sound) => {
        expect(sound).toHaveProperty('name', 'no-tags')
      })
    })

    it('returns ID3v1 comment tag as sound comment', () => {
      return readSoundMetaData({
        path: jetpack.path(__dirname, 'fixtures', 'id3-v1-comment.mp3')
      }).then((sound) => {
        expect(sound).toHaveProperty('tags', [
          expect.objectContaining({ title: 'ID3 v1 Comment' }),
          expect.objectContaining({ title: 'Extra words' })
        ])
      })
    })

    it('returns ID3v2 comment tag as sound comment', () => {
      return readSoundMetaData({
        path: jetpack.path(__dirname, 'fixtures', 'id3-v2-comment.mp3')
      }).then((sound) => {
        expect(sound).toHaveProperty('tags', [
          expect.objectContaining({ title: 'ID3 v2 Comment' }),
          expect.objectContaining({ title: 'Extra words' })
        ])
      })
    })

    it('returns mixed comment tag as comment given v1 and v2 comments are truthy', () => {
      return readSoundMetaData({
        path: jetpack.path(__dirname, 'fixtures', 'id3-mixed-comment.mp3')
      }).then((sound) => {
        expect(sound).toHaveProperty('tags', [
          expect.objectContaining({ title: 'ID3 v2 Comment' }),
          expect.objectContaining({ title: 'Extra words' }),
          expect.objectContaining({ title: 'ID3 v1 Comment' })
        ])
      })
    })

    it('reads TXXX:COMM header for tags', () => {
      return readSoundMetaData({
        path: jetpack.path(__dirname, 'fixtures', 'id3-v2-txxx-comm-header.mp3')
      }).then((sound) => {
        expect(sound).toHaveProperty('tags', [
          expect.objectContaining({ title: 'Tx Comment' }),
          expect.objectContaining({ title: 'Extra words' })
        ])
      })
    })

    it('reads TXXX:TXXX:COMM (duplicated txxx) header for tags', () => {
      return readSoundMetaData({
        path: jetpack.path(__dirname, 'fixtures', 'id3-v2-txxx-txxx-comm-header.mp3')
      }).then((sound) => {
        expect(sound).toHaveProperty('tags', [
          expect.objectContaining({ title: 'Tx Comment' }),
          expect.objectContaining({ title: 'Extra words' })
        ])
      })
    })

    it('treats mp1 files as mp3 codec', () => {
      return readSoundMetaData({
        path: jetpack.path(__dirname, 'fixtures', 'mp1.mp3')
      }).then((sound) => {
        expect(sound).toHaveProperty('format', 'mp3')
      })
    })

    it('throws error when given blank file', () => {
      return expect(readSoundMetaData({
        path: jetpack.path(__dirname, 'fixtures', 'blank-file.mp3')
      })).rejects.toThrow('Unrecognized format')
    })
  })
})
