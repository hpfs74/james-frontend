import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { CarSecurityClass } from './content.interface';

export interface AppContent {
  car?: {
    securityClass: any;
    coverages: any;
  },
  layout?: {
    footer: any;
  }
}

@Injectable()
export class ContentService {
  // TODO: build based on directory read
  private jsonFiles: AppContent = {
    car: {
      securityClass: '../content/car/security-class.json',
      coverages: '../content/car/coverage.json'
    },
    layout: {
      footer: '../content/layout/footer.json'
    }
  };

  private content: AppContent;

  constructor(private http: Http) {
  }

  public getContentObject(): AppContent {
    return this.content || {};
  }

  public loadFiles() {
    let obj = this.jsonFiles;
    this.content = {};
    Object.keys(obj).forEach((key) => {
      this.content[key] = {};

      Object.keys(obj[key]).forEach((fileGroup) => {
         this.loadContent(obj[key][fileGroup]).subscribe(content => this.content[key][fileGroup] = content);
      });
    });
  }

  private loadContent(file: string): Observable<Array<any>> {
    return this.http.request(file)
      .map(res => res.json());
  }
}
