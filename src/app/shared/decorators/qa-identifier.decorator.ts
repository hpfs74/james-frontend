export function QaIdentifier(id: string): ClassDecorator {
  return function (target: any) {
    if (id && id.length > 0) {
      target.prototype.qaRootId = id;
    }
  };
}
