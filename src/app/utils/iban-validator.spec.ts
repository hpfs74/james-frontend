import { isValidIban } from './iban-validator';

describe('Util: IBAN Validator', () => {
  it('should validate a Duch iban number', () => {
    expect(isValidIban('NL39RABO0300065264')).toBeTruthy();
    expect(isValidIban('NL39 RABO 0300 0652 64')).toBeTruthy();
    expect(isValidIban('NL39RABO030')).toBeFalsy();
    expect(isValidIban('NL39RABO030006526')).toBeFalsy();
  });

  it('should validate other iban numbers', () => {
    //http://www.rbs.co.uk/corporate/international/g0/guide-to-international-business/regulatory-information/iban/iban-example.ashx

    expect(isValidIban('AL47 2121 1009 0000 0002 3569 8741')).toBeTruthy();
    expect(isValidIban('AD12 0001 2030 2003 5910 0100')).toBeTruthy();
    expect(isValidIban('AT61 1904 3002 3457 3201')).toBeTruthy();
    expect(isValidIban('AZ21 NABZ 0000 0000 1370 1000 1944')).toBeTruthy();
    expect(isValidIban('BH67 BMAG 0000 1299 1234 56')).toBeTruthy();
    expect(isValidIban('BE62 5100 0754 7061')).toBeTruthy();
    expect(isValidIban('BA39 1290 0794 0102 8494')).toBeTruthy();
    expect(isValidIban('BG80 BNBG 9661 1020 3456 78')).toBeTruthy();
    expect(isValidIban('HR12 1001 0051 8630 0016 0')).toBeTruthy();
    expect(isValidIban('CY17 0020 0128 0000 0012 0052 7600')).toBeTruthy();
    expect(isValidIban('CZ65 0800 0000 1920 0014 5399')).toBeTruthy();
    expect(isValidIban('DK50 0040 0440 1162 43')).toBeTruthy();
    expect(isValidIban('EE38 2200 2210 2014 5685')).toBeTruthy();
    expect(isValidIban('FO97 5432 0388 8999 44')).toBeTruthy();
    expect(isValidIban('FI21 1234 5600 0007 85')).toBeTruthy();
    expect(isValidIban('FR14 2004 1010 0505 0001 3M02 606')).toBeTruthy();
    expect(isValidIban('GE29 NB00 0000 0101 9049 17')).toBeTruthy();
    expect(isValidIban('DE89 3704 0044 0532 0130 00')).toBeTruthy();
    expect(isValidIban('GI75 NWBK 0000 0000 7099 453')).toBeTruthy();
    expect(isValidIban('GR16 0110 1250 0000 0001 2300 695')).toBeTruthy();
    expect(isValidIban('GL56 0444 9876 5432 10')).toBeTruthy();
    expect(isValidIban('HU42 1177 3016 1111 1018 0000 0000')).toBeTruthy();
    expect(isValidIban('IS14 0159 2600 7654 5510 7303 39')).toBeTruthy();
    expect(isValidIban('IE29 AIBK 9311 5212 3456 78')).toBeTruthy();
    expect(isValidIban('IL62 0108 0000 0009 9999 999')).toBeTruthy();
    expect(isValidIban('IT40 S054 2811 1010 0000 0123 456')).toBeTruthy();
    expect(isValidIban('JO94 CBJO 0010 0000 0000 0131 0003 02')).toBeTruthy();
    expect(isValidIban('KW81 CBKU 0000 0000 0000 1234 5601 01')).toBeTruthy();
    expect(isValidIban('LV80 BANK 0000 4351 9500 1')).toBeTruthy();
    expect(isValidIban('LB62 0999 0000 0001 0019 0122 9114')).toBeTruthy();
    expect(isValidIban('LI21 0881 0000 2324 013A A')).toBeTruthy();
    expect(isValidIban('LT12 1000 0111 0100 1000')).toBeTruthy();
    expect(isValidIban('LU28 0019 4006 4475 0000')).toBeTruthy();
    expect(isValidIban('MK072 5012 0000 0589 84')).toBeTruthy();
    expect(isValidIban('MT84 MALT 0110 0001 2345 MTLC AST0 01S')).toBeTruthy();
    expect(isValidIban('MU17 BOMM 0101 1010 3030 0200 000M UR')).toBeTruthy();
    expect(isValidIban('MD24 AG00 0225 1000 1310 4168')).toBeTruthy();
    expect(isValidIban('MC93 2005 2222 1001 1223 3M44 555')).toBeTruthy();
    expect(isValidIban('ME25 5050 0001 2345 6789 51')).toBeTruthy();
    expect(isValidIban('NL39 RABO 0300 0652 64')).toBeTruthy();
    expect(isValidIban('NO93 8601 1117 947')).toBeTruthy();
    expect(isValidIban('PK36 SCBL 0000 0011 2345 6702')).toBeTruthy();
    expect(isValidIban('PL60 1020 1026 0000 0422 7020 1111')).toBeTruthy();
    expect(isValidIban('PT50 0002 0123 1234 5678 9015 4')).toBeTruthy();
    expect(isValidIban('QA58 DOHB 0000 1234 5678 90AB CDEF G')).toBeTruthy();
    expect(isValidIban('RO49 AAAA 1B31 0075 9384 0000')).toBeTruthy();
    expect(isValidIban('SM86 U032 2509 8000 0000 0270 100')).toBeTruthy();
    expect(isValidIban('SA03 8000 0000 6080 1016 7519')).toBeTruthy();
    expect(isValidIban('RS35 2600 0560 1001 6113 79')).toBeTruthy();
    expect(isValidIban('SK31 1200 0000 1987 4263 7541')).toBeTruthy();
    expect(isValidIban('SI56 1910 0000 0123 438')).toBeTruthy();
    expect(isValidIban('ES80 2310 0001 1800 0001 2345')).toBeTruthy();
    expect(isValidIban('SE35 5000 0000 0549 1000 0003')).toBeTruthy();
    expect(isValidIban('CH93 0076 2011 6238 5295 7')).toBeTruthy();
    expect(isValidIban('TN59 1000 6035 1835 9847 8831')).toBeTruthy();
    expect(isValidIban('TR33 0006 1005 1978 6457 8413 26')).toBeTruthy();
    expect(isValidIban('AE07 0331 2345 6789 0123 456')).toBeTruthy();
    // United Kingdom
    //expect(isValidIban('GB29 RBOS 6016 1331 9268 19')).toBeTruthy();
  });
});


