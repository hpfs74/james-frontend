import createAutoCorrectedDatePipe from 'text-mask-addons/dist/createAutoCorrectedDatePipe';

// Scoll back to form; assumes there's only one form of this type on current page
export function scrollToForm(cssClass: string): void {
  var element = <HTMLElement>document.querySelector(cssClass);
  if (element) {
    window.scrollTo(0, element.offsetTop);
  }
}

export const birthDateMask = {
  mask: [/[0-9]/, /[0-9]/, ' ', '/', ' ', /[0-9]/, /[0-9]/, ' ', '/', ' ', /[1-2]/, /[0-9]/, /[0-9]/, /[0-9]/],
  guide: true,
  keepCharPositions: false,
  decode: value => {
    const parts = value.replace(/[ _]/gim, '').split('/');

    const day = +parts[0];
    const month = +parts[1] - 1;
    const year = +parts[2];

    if (day > 0 && month >= 0 && year > 999) {
      const date = new Date(year, month, day);

      //check if day or month are not bigger then valid
      //note: in JS new Date(50, 60, 2016) is completely valid
      if (date.getDate() === day && date.getMonth() === month) {
        return date;
      }
    }

    return null;
  },
  pipe: createAutoCorrectedDatePipe('dd / mm / yyyy')
};
