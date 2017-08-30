module dcUtility {
  export function notCore(key: string) {
    return ['constructor',
      'clone',
      '__defineGetter__',
      '__defineSetter__',
      'hasOwnProperty',
      '__lookupGetter__',
      '__lookupSetter__',
      'propertyIsEnumerable',
      '__proto__',
      'toString',
      'toLocaleString',
      'valueOf',
      'isPrototypeOf'].indexOf(key) === -1;
  }

  export function props(obj: any): string[] {
    let p = [];
    for (; obj != null; obj = Object.getPrototypeOf(obj)) {
      let op = Object.getOwnPropertyNames(obj);
      for (let i = 0; i < op.length; i++) {
        if (p.indexOf(op[i]) === -1) {
          p.push(op[i]);
        }
      }
    }
    return p;
  }
}

export function flatten(object: Object, separator: string = '.'): any {
  const isValidObject = (value: {}): boolean => {
    if (!value) {
      return false;
    }

    const isArray = Array.isArray(value);
    const isBuffer = Buffer.isBuffer(value);
    const isΟbject = Object.prototype.toString.call(value) === '[object Object]';
    const hasKeys = !!Object.keys(value).length;

    return !isArray && !isBuffer && isΟbject && hasKeys;
  };

  const walker = (child: {}, path: Array<string> = []): Object => {
    return Object.assign({}, ...Object.keys(child).map(key => isValidObject(child[key])
      ? walker(child[key], path.concat([key]))
      : { [path.concat([key]).join(separator)]: child[key] })
    );
  };

  return Object.assign({}, walker(object));
}

export function clone(source: any, target?: any) {
  if (!target) {
    target = {};
  }

  let _props = dcUtility.props(source).filter(x => dcUtility.notCore(x));
  _props.forEach(key => {
    if (typeof source[key] === 'function') {
      target[key] = (...args: any[]) => {
        (source[key] as any).apply(target, args);
      };
    } else {
      target[key] = source[key];
    }
  });
  return target;
}
