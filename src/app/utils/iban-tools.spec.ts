import { isValidIBAN } from './iban-tools';

describe('Util: IBAN Validator', () => {
  it('should be invalid on number', () => {
    expect(isValidIBAN('123')).toBeFalsy();
    expect(isValidIBAN('1234')).toBeFalsy();
    expect(isValidIBAN('12345')).toBeFalsy();
    expect(isValidIBAN('123456')).toBeFalsy();
    expect(isValidIBAN('1234567')).toBeFalsy();
  });

  it('should validate a Dutch iban number', () => {
    expect(isValidIBAN('NL39RABO0300065264')).toBeTruthy();
    expect(isValidIBAN('NL39 RABO 0300 0652 64')).toBeTruthy();
    expect(isValidIBAN('NL39RABO030')).toBeFalsy();
    expect(isValidIBAN('NL39RABO030006526')).toBeFalsy();
    // test case INS-1337
    expect(isValidIBAN('052918145')).toBeFalsy();
  });

  it('should validate other iban numbers', () => {
    // http://www.rbs.co.uk/corporate/international/g0/guide-to-international-business/regulatory-information/iban/iban-example.ashx

    expect(isValidIBAN('AL47 2121 1009 0000 0002 3569 8741')).toBeTruthy();
    expect(isValidIBAN('AD12 0001 2030 2003 5910 0100')).toBeTruthy();
    expect(isValidIBAN('AT61 1904 3002 3457 3201')).toBeTruthy();
    expect(isValidIBAN('AZ21 NABZ 0000 0000 1370 1000 1944')).toBeTruthy();
    expect(isValidIBAN('BH67 BMAG 0000 1299 1234 56')).toBeTruthy();
    expect(isValidIBAN('BE62 5100 0754 7061')).toBeTruthy();
    expect(isValidIBAN('BA39 1290 0794 0102 8494')).toBeTruthy();
    expect(isValidIBAN('BG80 BNBG 9661 1020 3456 78')).toBeTruthy();
    expect(isValidIBAN('HR12 1001 0051 8630 0016 0')).toBeTruthy();
    expect(isValidIBAN('CY17 0020 0128 0000 0012 0052 7600')).toBeTruthy();
    expect(isValidIBAN('CZ65 0800 0000 1920 0014 5399')).toBeTruthy();
    expect(isValidIBAN('DK50 0040 0440 1162 43')).toBeTruthy();
    expect(isValidIBAN('EE38 2200 2210 2014 5685')).toBeTruthy();
    expect(isValidIBAN('FO97 5432 0388 8999 44')).toBeTruthy();
    expect(isValidIBAN('FI21 1234 5600 0007 85')).toBeTruthy();
    expect(isValidIBAN('FR14 2004 1010 0505 0001 3M02 606')).toBeTruthy();
    expect(isValidIBAN('GE29 NB00 0000 0101 9049 17')).toBeTruthy();
    expect(isValidIBAN('DE89 3704 0044 0532 0130 00')).toBeTruthy();
    expect(isValidIBAN('GI75 NWBK 0000 0000 7099 453')).toBeTruthy();
    expect(isValidIBAN('GR16 0110 1250 0000 0001 2300 695')).toBeTruthy();
    expect(isValidIBAN('GL56 0444 9876 5432 10')).toBeTruthy();
    expect(isValidIBAN('HU42 1177 3016 1111 1018 0000 0000')).toBeTruthy();
    expect(isValidIBAN('IS14 0159 2600 7654 5510 7303 39')).toBeTruthy();
    expect(isValidIBAN('IE29 AIBK 9311 5212 3456 78')).toBeTruthy();
    expect(isValidIBAN('IL62 0108 0000 0009 9999 999')).toBeTruthy();
    expect(isValidIBAN('IT40 S054 2811 1010 0000 0123 456')).toBeTruthy();
    expect(isValidIBAN('JO94 CBJO 0010 0000 0000 0131 0003 02')).toBeTruthy();
    expect(isValidIBAN('KW81 CBKU 0000 0000 0000 1234 5601 01')).toBeTruthy();
    expect(isValidIBAN('LV80 BANK 0000 4351 9500 1')).toBeTruthy();
    expect(isValidIBAN('LB62 0999 0000 0001 0019 0122 9114')).toBeTruthy();
    expect(isValidIBAN('LI21 0881 0000 2324 013A A')).toBeTruthy();
    expect(isValidIBAN('LT12 1000 0111 0100 1000')).toBeTruthy();
    expect(isValidIBAN('LU28 0019 4006 4475 0000')).toBeTruthy();
    expect(isValidIBAN('MK072 5012 0000 0589 84')).toBeTruthy();
    expect(isValidIBAN('MT84 MALT 0110 0001 2345 MTLC AST0 01S')).toBeTruthy();
    expect(isValidIBAN('MU17 BOMM 0101 1010 3030 0200 000M UR')).toBeTruthy();
    expect(isValidIBAN('MD24 AG00 0225 1000 1310 4168')).toBeTruthy();
    expect(isValidIBAN('MC93 2005 2222 1001 1223 3M44 555')).toBeTruthy();
    expect(isValidIBAN('ME25 5050 0001 2345 6789 51')).toBeTruthy();
    expect(isValidIBAN('NL39 RABO 0300 0652 64')).toBeTruthy();
    expect(isValidIBAN('NO93 8601 1117 947')).toBeTruthy();
    expect(isValidIBAN('PK36 SCBL 0000 0011 2345 6702')).toBeTruthy();
    expect(isValidIBAN('PL60 1020 1026 0000 0422 7020 1111')).toBeTruthy();
    expect(isValidIBAN('PT50 0002 0123 1234 5678 9015 4')).toBeTruthy();
    expect(isValidIBAN('QA58 DOHB 0000 1234 5678 90AB CDEF G')).toBeTruthy();
    expect(isValidIBAN('RO49 AAAA 1B31 0075 9384 0000')).toBeTruthy();
    expect(isValidIBAN('SM86 U032 2509 8000 0000 0270 100')).toBeTruthy();
    expect(isValidIBAN('SA03 8000 0000 6080 1016 7519')).toBeTruthy();
    expect(isValidIBAN('RS35 2600 0560 1001 6113 79')).toBeTruthy();
    expect(isValidIBAN('SK31 1200 0000 1987 4263 7541')).toBeTruthy();
    expect(isValidIBAN('SI56 1910 0000 0123 438')).toBeTruthy();
    expect(isValidIBAN('ES80 2310 0001 1800 0001 2345')).toBeTruthy();
    expect(isValidIBAN('SE35 5000 0000 0549 1000 0003')).toBeTruthy();
    expect(isValidIBAN('CH93 0076 2011 6238 5295 7')).toBeTruthy();
    expect(isValidIBAN('TN59 1000 6035 1835 9847 8831')).toBeTruthy();
    expect(isValidIBAN('TR33 0006 1005 1978 6457 8413 26')).toBeTruthy();
    expect(isValidIBAN('AE07 0331 2345 6789 0123 456')).toBeTruthy();
    // United Kingdom
    // expect(isValidIBAN('GB29 RBOS 6016 1331 9268 19')).toBeTruthy();
  });
});


