import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { environment } from '../environments/environment';

export interface Link {
  label: string;
  link: string;
}

export interface Content {
  appStore: {
    iOS: string;
    android: string
  };
  externalLinks: {
    privacyStatement: string;
    termsAndConditions: string;
    serviceGuide: string;
  };
  email: {
    phishing: Link;
  };
  phone: Link;
  footer: {
    about: {
      title: string;
      [links: string]: string;
    },
    packgages: {
      title: string;
      [links: string]: string;
    },
    policies: {
      links: {title: string, url: string, delimiter: string}[];
    },
    service_contant: {
      title: string;
      [links: string]: string;
    },
    solical: {
      links: {title: string, url: string, icon: string}[];
    },
    solutions: {
      title: string;
      [links: string]: string;
    }
  };
}

@Injectable()
export class ContentConfig {
  private content: Content;
  private file: string;

  constructor(private http: Http) {
    // TODO: define this in environment file?
    this.file = '/content/content.json';
  }

  getContent() {
    return this.content;
  }

  getKey(key: string) {
    return this.content[key];
  }

  load(): Promise<any> {
    return this.http.request(this.file)
      .map(res => res.json())
      .toPromise()
      .then((data) => this.content = data)
      .catch(error => Promise.resolve());
  }
}
