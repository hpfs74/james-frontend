export function getLicenseFormats(): Array<RegExp> {
  let formats = new Array<RegExp>();
  formats[0] = /^[a-zA-Z]{2}[\d]{2}[\d]{2}$/;         //1 XX-99-99
  formats[1] = /^[\d]{2}[\d]{2}[a-zA-Z]{2}$/;         //2 99-99-XX
  formats[2] = /^[\d]{2}[a-zA-Z]{2}[\d]{2}$/;         //3 99-XX-99
  formats[3] = /^[a-zA-Z]{2}[\d]{2}[a-zA-Z]{2}$/;    //4 XX-99-XX
  formats[4] = /^[a-zA-Z]{2}[a-zA-Z]{2}[\d]{2}$/;    //5 XX-XX-99
  formats[5] = /^[\d]{2}[a-zA-Z]{2}[a-zA-Z]{2}$/;    //6 99-XX-XX
  formats[6] = /^[\d]{2}[a-zA-Z]{3}[\d]{1}$/;         //7 99-XXX-9
  formats[7] = /^[\d]{1}[a-zA-Z]{3}[\d]{2}$/;         //8 9-XXX-99
  formats[8] = /^[a-zA-Z]{2}[\d]{3}[a-zA-Z]{1}$/;    //9 XX-999-X
  formats[9] = /^[a-zA-Z]{1}[\d]{3}[a-zA-Z]{2}$/;    //10 X-999-XX
  formats[10] = /^[a-zA-Z]{3}[\d]{2}[a-zA-Z]{1}$/;   //11 XXX-99-X
  formats[11] = /^[a-zA-Z]{1}[\d]{2}[a-zA-Z]{3}$/;   //12 X-99-XXX
  formats[12] = /^[\d]{1}[a-zA-Z]{2}[\d]{3}$/;        //13 9-XX-999
  formats[13] = /^[\d]{3}[a-zA-Z]{2}[\d]{1}$/;        //14 999-XX-9

  return formats;
}

export function getLicenseSideCode(license: string): number {
  license = license.replace(/-/g, '').toUpperCase();

  let formats = getLicenseFormats();
  let exclude = /^CD[ABFJNST][0-9]{1,3}$/;          // licenseplate for diplomates (e.g. CB1 or CDJ45)

  for (let i = 0; i < formats.length; i++) {
    if (license.match(formats[i])) {
      return i + 1;
    }
  }

  if (license.match(exclude)) {
    return -1;
  }
}

export function formatLicensePlate(license: string, sideCode: number) {
  license = license.replace(/-/g, '').toUpperCase();

  switch (sideCode) {
    case 1: case 2: case 3: case 4: case 5: case 6:
      return license.substr(0, 2) + '-' + license.substr(2, 2) + '-' + license.substr(4, 2);
    case 7: case 9:
      return license.substr(0, 2) + '-' + license.substr(2, 3) + '-' + license.substr(5, 1);
    case 8: case 10:
      return license.substr(0, 1) + '-' + license.substr(1, 3) + '-' + license.substr(4, 2);
    case 11: case 14:
      return license.substr(0, 3) + '-' + license.substr(3, 2) + '-' + license.substr(5, 1);
    case 12: case 13:
      return license.substr(0, 1) + '-' + license.substr(1, 2) + '-' + license.substr(3, 3);
    default:
      return license;
  }
}
