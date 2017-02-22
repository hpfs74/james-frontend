
/**
 * @description
 * Describe a section for navigation purpose
 */
export class Section {
    icon: string;
    name: string;
    links: Array<Nav>;
}

/**
 * @description
 * Describe a navigation link /// <reference path="ki-footer" />
 * and also /// <reference path="ki-navbar" />
   require('./footer.component.html')
 */
export class Nav {
    id: string;
    title: string;
    url?: string;
    target?: string;
    alternate?: string;
    icon?: string;
    image?: string;
    cssClass?: string;
}
