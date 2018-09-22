import {
  getModuleShape,
  resolveModuleUrl,
} from '../modulePaths';

describe('sound module paths', () => {
  it('resolveModuleUrl returns the same URL when it ends with json file name', () => {
    expect(resolveModuleUrl('http://example.com/tiny.json')).toEqual('http://example.com/tiny.json');
  });

  it('resolveModuleUrl returns URL with appended manifest.json when path is only slash', () => {
    expect(resolveModuleUrl('http://example.com/')).toEqual('http://example.com/manifest.json');
  });

  it('resolveModuleUrl returns URL with appended manifest.json for one component path ending on slash', () => {
    expect(resolveModuleUrl('http://example.com/foo/')).toEqual('http://example.com/foo/manifest.json');
  });

  it('resolveModuleUrl returns URL with appended manifest.json for two component path ending on slash', () => {
    expect(resolveModuleUrl('http://example.com/foo/bar/')).toEqual('http://example.com/foo/bar/manifest.json');
  });

  it('resolveModuleUrl returns URL with appended manifest.json when it ends on no extension filename', () => {
    expect(resolveModuleUrl('http://example.com/foo')).toEqual('http://example.com/manifest.json');
  });

  it('resolveModuleUrl returns URL with appended manifest.json when it ends on mp3 extension filename', () => {
    expect(resolveModuleUrl('http://example.com/foo.mp3')).toEqual('http://example.com/manifest.json');
  });

  it('resolveModuleUrl with moduleName returns the same URL when it ends with json file name', () => {
    expect(resolveModuleUrl('http://example.com/tiny.json', 'test-module')).toEqual('http://example.com/tiny.json');
  });

  it('resolveModuleUrl with moduleName returns URL with appended manifest.json when path is only slash', () => {
    expect(resolveModuleUrl('http://example.com/', 'test-module')).toEqual('http://example.com/test-module/manifest.json');
  });

  it('resolveModuleUrl with moduleName returns URL with appended manifest.json when path ends on slash', () => {
    expect(resolveModuleUrl('http://example.com/foo/', 'test-module')).toEqual('http://example.com/foo/test-module/manifest.json');
  });

  it('resolveModuleUrl with moduleName returns URL with appended manifest.json when it ends on no extension filename', () => {
    expect(resolveModuleUrl('http://example.com/foo', 'test-module')).toEqual('http://example.com/test-module/manifest.json');
  });

  it('resolveModuleUrl with moduleName returns URL with appended manifest.json when it ends on mp3 extension filename', () => {
    expect(resolveModuleUrl('http://example.com/foo.mp3', 'test-module')).toEqual('http://example.com/test-module/manifest.json');
  });

  it('getModuleShape sets module name to fallback when not available', () => {
    expect(getModuleShape(
      'http://example.com/module.json',
      {},
      'fallbackName'
    )).toHaveProperty('name', 'fallbackName');
  });

  it('getModuleShape keeps module name when available', () => {
    expect(getModuleShape(
      'http://example.com/module.json',
      {
        name: 'moduleName',
      },
      'fallbackName'
    )).toHaveProperty('name', 'moduleName');
  });

  it('getModuleShape sets module URL when not available', () => {
    expect(getModuleShape(
      'http://example.com/module.json',
      {
        name: 'moduleName',
      },
      'fallbackName'
    )).toHaveProperty('url', 'http://example.com/module.json');
  });
});
