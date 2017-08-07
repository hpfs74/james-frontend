// TODO: generate mask based on input pattern, see licenseplate.validator.ts for valid patterns

export const licensePlateMask = {
  mask: (rawValue: string) => {
    return [
      /[a-zA-Z0-9]/,
      /[a-zA-Z0-9\-]/,
      /[a-zA-Z0-9\-]/,
      /[a-zA-Z0-9\-]/,
      /[a-zA-Z0-9\-]/,
      /[a-zA-Z0-9\-]/,
      /[a-zA-Z0-9\-]/,
      /[a-zA-Z0-9]/];
  },
  guide: false,
  pipe: function (conformedValue) {
    return conformedValue.toUpperCase();
  },
  decode: value => value.replace(/[ \-]/gmi, '').toUpperCase()
};
