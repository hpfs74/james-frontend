/**
 * models for navigations
 * @module models/Nav
 */


/**
 * @name
 * Section
 * @description
 * Describe a section for navigation purpose
 *
 */
export class Section {
  icon: string;
  name: string;
  links: Array<Nav>;
}

/**
 * @name
 * Nav
 * @description
 * Describe a navigation link /// <reference path="knx-footer" />
 * and also /// <reference path="knx-navbar" />
   require('./footer.component.html')
 */
export class Nav {
  id: string;
  title: string;
  routePath: string;
  url?: string;
  target?: string;
  alternate?: string;
  icon?: string;
  image?: string;
  cssClass?: string;
  menuType: NavItemType;
  rel?: string;
}

export enum NavItemType {
  LEFT,
  RIGHT
}
