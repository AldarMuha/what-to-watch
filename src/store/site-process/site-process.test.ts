import { setGenre, siteProcess } from './site-process';

describe('Reducer: userProcess', () => {
  it('without additional parameters should return initial state', () => {
    expect(siteProcess.reducer(void 0, { type: 'UNKNOWN_ACTION' }))
      .toEqual({
        genre: 'All genres'
      });
  });
  it('should set genre by a given name', () => {
    const state = {
      genre: 'All genres'
    };
    expect(siteProcess.reducer(state, setGenre('Dramas')))
      .toEqual({
        genre: 'Dramas'
      });
  });
});
