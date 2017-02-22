
/**
 * @description
 * Describe a section for navigation purpose
 */
export class Section {
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
    Url: string;
    Target: string;
}
