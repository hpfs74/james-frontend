
export const CookieServiceMock = {

  /**
   * Checks if cookie exist
   *
   * @param  {string} cookie name
   * @returns true if cookie exist
   */
  check: (name: string) => {
    name = encodeURIComponent(name);
    const regexp = new RegExp('(?:^' + name + '|;\\s*' + name + ')=(.*?)(?:;|$)', 'g');
    const exists = regexp.test(document.cookie);
    return exists;
  },

  /**
   * Get a cookie by its name
   *
   * @param  {string} name of the cookie
   * @returns cookie's value
   */
  get: (name: string) => {
    if (!CookieServiceMock.check(name)) {
      return '';
    }

    name = encodeURIComponent(name);
    const regexp = new RegExp('(?:^' + name + '|;\\s*' + name + ')=(.*?)(?:;|$)', 'g');
    const result = regexp.exec(document.cookie);
    return decodeURIComponent(result[1]);
  },

  /**
   * get the list of all the cookies in the domain
   *
   * @returns a collection of all the cookies
   */
  getAll: () => {
    const cookies: any = {};

    if (document.cookie && document.cookie !== '') {
      const split = document.cookie.split(';');
      for (let i = 0; i < split.length; i++) {
        const currCookie = split[i].split('=');
        currCookie[0] = currCookie[0].replace(/^ /, '');
        cookies[decodeURIComponent(currCookie[0])] = decodeURIComponent(currCookie[1]);
      }
    }

    return cookies;
  },

  /**
   * set a new cookie
   *
   * @param  {string} name Cookie's identification
   * @param  {string} value Cookie's value
   * @param  {number} expires Cookie's expiration date in days from now or at a specific date from a Date object.
   *                  If it's undefined the cookie is a session Cookie
   * @param  {string} path Path relative to the domain where the cookie should be avaiable. Default /
   * @param  {string} domain Domain where the cookie should be avaiable. Default current domain
   * @param  {boolean} secure If true, the cookie will only be available through a secured connection
   */
  set: (name: string, value: string, expires?: number | Date, path?: string, domain?: string, secure?: boolean) => {
    let cookieStr = encodeURIComponent(name) + '=' + encodeURIComponent(value) + ';';

    if (expires) {
      if (typeof expires === 'number') {
        const dtExpires = new Date(new Date().getTime() + expires * 1000 * 60 * 60 * 24);
        cookieStr += 'expires=' + dtExpires.toUTCString() + ';';
      } else {
        cookieStr += 'expires=' + expires.toUTCString() + ';';
      }
    }

    if (path) {
      cookieStr += 'path=' + path + ';';
    }
    if (domain) {
      cookieStr += 'domain=' + domain + ';';
    }
    if (secure) {
      cookieStr += 'secure;';
    }

    document.cookie = cookieStr;
  },

  /**
   * Removes specified Cookie
   *
   * @param  {string} name Cookie's identification
   * @param  {string} path Path relative to the domain where the cookie should be avaiable. Default /
   * @param  {string} domain Domain where the cookie should be avaiable. Default current domain
   */
  delete: (name: string, path?: string, domain?: string) => {
    // If the cookie exists
    if (CookieServiceMock.get(name)) {
      CookieServiceMock.set(name, '', -1, path, domain);
    }
  },

  /**
   * Delete all cookie available
   *
   * TODO: consider path and domain usage
   */
  deleteAll: (path?: string, domain?: string) => {
    const cookies: any = CookieServiceMock.getAll();

    for (const cookieName of Object.keys(cookies)) {
      CookieServiceMock.delete(cookieName, path, domain);
    }
  }
};
