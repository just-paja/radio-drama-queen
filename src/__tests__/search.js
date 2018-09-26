import { stringSearch } from '../search';

describe('stringSearch', () => {
  it('resolves two word search as relevant', () => {
    expect(stringSearch('alien-spaceship', 'alien-spaceship'))
      .toHaveProperty('relevant', true);
  });
});
