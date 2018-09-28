import sagas from '..';

import { categoryList } from '../../../soundCategories/actions';
import { getSagaTester } from '../../../../mock';
import { libraryWipe, soundModule } from '../../actions';
import { soundList } from '../../../sounds/actions';
import { tagList } from '../../../tags/actions';

import * as localAssetsManager from '../../../LocalAssetsManager';

describe('libraryWipe saga', () => {
  beforeEach(() => {
    jest.spyOn(localAssetsManager, 'downloadConfig').mockImplementation();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('triggers sound modules wipe', () => {
    const sagaTester = getSagaTester();
    sagaTester.runAll(sagas);
    sagaTester.dispatch(libraryWipe.trigger());
    expect(sagaTester.numCalled(soundModule.CLEAR)).toBe(1);
  });

  it('triggers sound tags wipe', () => {
    const sagaTester = getSagaTester();
    sagaTester.runAll(sagas);
    sagaTester.dispatch(libraryWipe.trigger());
    expect(sagaTester.numCalled(tagList.CLEAR)).toBe(1);
  });

  it('triggers sound wipe', () => {
    const sagaTester = getSagaTester();
    sagaTester.runAll(sagas);
    sagaTester.dispatch(libraryWipe.trigger());
    expect(sagaTester.numCalled(soundList.CLEAR)).toBe(1);
  });

  it('triggers sound category wipe', () => {
    const sagaTester = getSagaTester();
    sagaTester.runAll(sagas);
    sagaTester.dispatch(libraryWipe.trigger());
    expect(sagaTester.numCalled(categoryList.CLEAR)).toBe(1);
  });

  it('triggers success on finish', () => {
    const sagaTester = getSagaTester();
    sagaTester.runAll(sagas);
    sagaTester.dispatch(libraryWipe.trigger());
    expect(sagaTester.numCalled(libraryWipe.SUCCESS)).toBe(1);
  });
});
