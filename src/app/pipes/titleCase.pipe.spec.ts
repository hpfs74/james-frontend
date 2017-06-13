import { TitleCasePipe } from './titleCase.pipe';

describe('Round Number Pipe', () => {
  it('should round number', () => {
    let titleCasePipe: TitleCasePipe;
    titleCasePipe = new TitleCasePipe();
    expect(titleCasePipe.transform('well hello there!', 17)).toBe('Well Hello There!');
  });
});
