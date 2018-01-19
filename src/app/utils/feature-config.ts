import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { environment } from '@env/environment';

@Injectable()
export class FeatureConfig {
  endpointUrl: string = environment.james.featureToggle;
  features: any;
  constructor(private http: Http) {
    window['featureConfig'] = this;
  }

  getFeatures() {
    return this.features;
  }

  guid() {
    let nav = window.navigator;
    let guid = nav.mimeTypes.length.toString();
    let screen = window.screen;
    guid += nav.userAgent.replace(/\D+/g, '');
    guid += nav.plugins.length;
    guid += screen.height || '';
    guid += screen.width || '';
    guid += screen.pixelDepth || '';
    return guid;
  }

  getUserId() {
    const cookies = document.cookie ? JSON.parse(document.cookie) : null;
    const featureGroup = {
      id: this.guid(),
      group: 'A'
    };
    if (cookies) {
      return cookies.id;
    }
    document.cookie = JSON.stringify(featureGroup);
    return featureGroup.id;
  }

  load(): Promise<any> {
    return this.http.post(this.endpointUrl, {userId: this.getUserId().toString()})
      .map(res => res.json())
      .toPromise()
      .then((data) => this.features = JSON.parse(data.body))
      .catch(error => Promise.resolve());
  }
}


/*

  const FEATURE_CONFIGS = {
    A: FEATURE_CONFIG_A,
    B: FEATURE_CONFIG_B
  }

  const FEATURE_CONFIG_A = {
    helloWorld: true
  }

  const FEATURE_CONFIG_B = {
    helloWorld: false
  }

  mainFunc(event, context, callback) {
    dynamo.scan({ TableName: 'UserGroups' }, (err, res) => {
      if (err) {
        return errorHandler(err, callback);
      }
      this.getResult(event, res, callback);
    });
  }

  // call this function to filter trough the db and get all users, return object in this format
  getUsers() {
    const users = {
      groupACount: 2,
      groupBCount: 4,
      usersIds: [1,2,3,4]
    }
    return users;
  }

  getResult(event, DBResult, callback) {
    if (!DBResult.Count) {
      // put value in db
      const newDBItem = {
        Item: {
          "userId": event.userId,
          "group": 'A'
        },
        ReturnConsumedCapacity: "TOTAL",
        TableName: "UserGroups"
      };
      dynamo.putItem(newDBItem, callback);
    }
    const groupACount = DBResult.Items
    const userId = event.userId;
    const users = this.getUsers();
    const userExists = users.userIds.indexOf(userId);
    if (userExists) {

    }
    if (users.groupACount >= users.groupBCount) {

    }
  }

  getFeatueConfig(feature) {
    return FEATURE_CONFIGS[feature] ? FEATURE_CONFIGS[feature] : FEATURE_CONFIGS.A;
  }

*/
