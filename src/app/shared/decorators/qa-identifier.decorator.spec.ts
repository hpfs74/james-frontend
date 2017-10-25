import { QaIdentifier } from './qa-identifier.decorator';

describe('ClassDecorator: @QaIdentifier', () => {
  it('should return a class with qaRootId property', () => {
    class Test {
      testProp = 'hello';
    }

    const decorate = QaIdentifier('myTestValue');

    decorate(Test);

    let comp = new Test() as any;
    expect(comp.testProp).toEqual('hello');
    expect(comp.qaRootId).toEqual('myTestValue');
  });

  it('should not add an empty value to the class', () => {
    class Test {
      testProp = 'hello';
    }

    const decorate = QaIdentifier('');

    decorate(Test);

    let comp = new Test() as any;
    expect(comp.testProp).toEqual('hello');
    expect(comp.qaRootId).toBeUndefined();
  });
});
