import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class AddressLookupService {

  constructor() {
    // here goes the construct
  }

  public lookUp(postalCode: string, addressNumber: string): Observable<any> {
    return null;
  }
}

  // public lookupAddressService(postalCode : string, addressNumber : string) : Observable<any> {
  //   // Config options for service
  //   let serviceOptions = this.config.options.services.address[this.config.options.env];
  //   console.log('service', serviceOptions);

  //   // Create request
  //   const params: URLSearchParams = new URLSearchParams();
  //   params.set('_AE_ADRES_PCODE', postalCode)
  //   params.set('_AE_ADRES_HUISNR', addressNumber);

  //   let headers = new Headers();
  //   let auth = getDrupalAuthToken() || serviceOptions.auth;
  //   if (auth) {
  //     headers.append("Authorization", "Basic " + auth);
  //   }
  //   headers.append('Content-Type', 'application/json');

  //   let reqOptionsDef : any = {
  //     search: params,
  //   }
  //   // Either use withCredentials (existing cookies for cross domain requests in dev mode) or supply custom headers
  //   if (serviceOptions.withCredentials) {
  //     reqOptionsDef.withCredentials = true;
  //   } else {
  //     reqOptionsDef.headers = headers;
  //   }
  //   // Create request options object
  //   let requestOptions = new RequestOptions(reqOptionsDef);
  //   let url = serviceOptions.url;
  //   console.log('getting', url, requestOptions, serviceOptions);
  //   return this.config.http.get(url, requestOptions)
  //     .map((res) : any => {
  //       let json = res.json();
  //       console.log('address service response', json);
  //       if (json && json.retrieveAddressResponse && json.retrieveAddressResponse._AE_ADRES) {
  //         let result = json.retrieveAddressResponse._AE_ADRES;
  //         if (result !== true && result.STRAAT && result.PLAATS) {
  //           return {
  //             street: result.STRAAT,
  //             city: result.PLAATS
  //           };
  //         }
  //       }
  //       // Otherwise throw error
  //       throw 'invalid';
  //     });
  // }
