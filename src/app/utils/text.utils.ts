export function stripHTML(str: string) {
  return str.replace(/<{1}[^<>]{1,}>{1}/g, '');
}

