import { ClickOutsideDirective } from './click-outside.directive';
import { ElementRef } from '@angular/core';

describe('Class: ClickOutsideDirective', () => {
  class MockElementRef implements ElementRef {
    nativeElement = {
      attachOutsideOnClick: true,
      delayClickOutsideInit: true,
      exclude: '',
      excludeBeforeClick: true,
      clickOutsideEvents: 'focus'
    };
  }

  let directive: ClickOutsideDirective;

  beforeAll(() => {
    directive = new ClickOutsideDirective(new MockElementRef());
  });

  it('should initialize correctly', () => {
    directive['_isBrowser'] = true;
    expect(directive).toBeDefined();
  });

  it('should init in browser', () => {
    directive['_isBrowser'] = true;
    directive.ngOnInit();
    expect(directive).toBeDefined();
    expect(directive['_events'].length).toEqual(1);

    directive.clickOutsideEvents = 'focus mouseover';
    directive.ngOnInit();
    expect(directive['_events'].length).toEqual(2);
  });

  it('should destroy in browser', () => {
    directive['_isBrowser'] = true;
    directive.ngOnDestroy();
    expect(directive).toBeDefined();
  });

  xit('should track changes', () => {
    directive['_isBrowser'] = true;
    directive.ngOnChanges({});
    expect(directive['_init']).toHaveBeenCalled();
  });

  xit('should track changes', () => {
    directive['_initOnClickBody']();
    expect(directive).toBeDefined();
    expect(directive['_initClickListeners']).toHaveBeenCalled();
  });

  it('should track changes', () => {
    directive['_initClickListeners']();
    expect(directive).toBeDefined();
  });

  it('should track changes', () => {
    directive['_excludeCheck']();
    expect(directive).toBeDefined();
  });

  xit('should track changes', () => {
    directive['_isBrowser'] = true;
    expect(directive['_shouldExclude']('header')).toEqual(false);
    directive['_nodesExcluded'] = [document.createElement('div')];
    expect(directive['_shouldExclude']('div')).toEqual(true);
  });
});
