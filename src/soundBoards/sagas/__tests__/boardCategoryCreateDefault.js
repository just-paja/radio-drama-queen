import sagas, { createDefaultCategory } from '..';
import getSagaTester from '../../../../mock/sagaTester';

describe('categoryCreateDefault saga', () => {
  it('creates default board category when it does not exist', () => {
    const sagaTester = getSagaTester({
      soundBoards: {
        list: [
          {
            uuid: 'board-1',
          },
        ],
      },
    });
    sagaTester.runAll(sagas);
    sagaTester.run(createDefaultCategory, 'board-1');
    expect(sagaTester.getState().soundCategories.list).toContainEqual(
      expect.objectContaining({
        name: null,
        board: 'board-1',
      })
    );
  });

  it('does not create another default board category when it already exists', () => {
    const sagaTester = getSagaTester({
      soundBoards: {
        list: [
          {
            uuid: 'board-1',
          },
        ],
      },
      soundCategories: {
        list: [
          {
            name: null,
            uuid: 'category-1',
            board: 'board-1',
          },
        ],
      },
    });
    sagaTester.runAll(sagas);
    sagaTester.run(createDefaultCategory, 'board-1');
    expect(sagaTester.getState().soundCategories.list).toHaveLength(1);
  });
});
