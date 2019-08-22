import { LocalModule, RemoteModule, getDriver } from '..'

describe('Modules driver interface', () => {
  it('getDriver returns remote driver', () => {
    return expect(getDriver('remote')).toBe(RemoteModule)
  })

  it('getDriver returns local driver', () => {
    return expect(getDriver('local')).toBe(LocalModule)
  })

  it('throws given driver is unsupported', () => {
    return expect(() => getDriver('xyz')).toThrow('Unsupported driver: xyz')
  })
})
