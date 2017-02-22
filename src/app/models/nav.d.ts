
/**
 * @description
 * Describe a section for navigation purpose
 */
export class Section {
    Icon: string;
    Name: string;
    Links: Array<Nav>;
}

/**
 * @description
 * Describe a navigation link /// <reference path="ki-footer" />
 * and also /// <reference path="ki-navbar" />
   require('./footer.component.html')
 */
export class Nav {
    Id: string;
    Title: string;
    Url?: string;
    Target?: string;
    Alternate?: string;
    Icon?: string;
    Image?: string;
    Class?: string;
}
