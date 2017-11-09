import { stripHTML } from './text.utils';

describe('Utils: Text', () => {
  it('should remove html tags from a string', () => {
    expect(stripHTML('hello <b>this</b> is a <div class="myClass">Test</div>')).toEqual('hello this is a Test');
  });
});
