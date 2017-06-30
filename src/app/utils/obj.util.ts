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
