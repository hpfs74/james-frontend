import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { CookieService } from '@app/core/services/cookie.service';
import { environment } from '@env/environment';

const FEATURE_TOOGLE_COOKIE_NAME = 'featureToggleCookie';
@Injectable()
export class FeatureConfigService {
  endpointUrl: string = environment.james.featureToggle;
  featureConfig: any = environment.featureToggles;
  uniqueId = '';
  constructor(private http: Http,
              private cookies: CookieService) {
    this.setAbScriptToHead();
  }

  /* tslint:disable */
  private setAbScriptToHead() {
    let abTestScript = document.createElement('script');
    abTestScript.innerHTML = `var _vwo_code=(function(){
        var account_id=${environment.vwoId},
        settings_tolerance=2000,
        library_tolerance=2500,
        use_existing_jquery=false,
        /* DO NOT EDIT BELOW THIS LINE */
        f=false,d=document;return{use_existing_jquery:function(){return use_existing_jquery;},library_tolerance:function(){return library_tolerance;},finish:function(){if(!f){f=true;var a=d.getElementById('_vis_opt_path_hides');if(a)a.parentNode.removeChild(a);}},finished:function(){return f;},load:function(a){var b=d.createElement('script');b.src=a;b.type='text/javascript';b.innerText;b.onerror=function(){_vwo_code.finish();};d.getElementsByTagName('head')[0].appendChild(b);},init:function(){settings_timer=setTimeout('_vwo_code.finish()',settings_tolerance);var a=d.createElement('style'),b='body{opacity:0 !important;filter:alpha(opacity=0) !important;background:none !important;}',h=d.getElementsByTagName('head')[0];a.setAttribute('id','_vis_opt_path_hides');a.setAttribute('type','text/css');if(a.styleSheet)a.styleSheet.cssText=b;else a.appendChild(d.createTextNode(b));h.appendChild(a);this.load('//dev.visualwebsiteoptimizer.com/j.php?a='+account_id+'&u='+encodeURIComponent(d.URL)+'&r='+Math.random());return settings_timer;}};}());_vwo_settings_timer=_vwo_code.init();`;
    document.head.insertBefore(abTestScript, document.head.firstChild);
  }
  /* tslint:enable */
  /**
   * return boolean if value exists on feature config object
   * can also be used to hide an feature if we don't have the feature var set to true
   * @param value string value in feature config object
   */
  isOn(value: string) {
    if (this.featureConfig.hasOwnProperty(value)) {
      return this.featureConfig[value] === 'false' ? false : this.featureConfig[value] ;
    }
    return false;
  }
  /**
   * If ID's are generated more than 1 milliseconds apart, they are 100% unique.
   * If two ID's are generated at shorter intervals, and assuming that the random method is truly random,
   * this would generate ID's that are 99.99999999999999% likely to be globally unique.
   */
  getUniqueId() {
    const cookies = this.cookies.get(FEATURE_TOOGLE_COOKIE_NAME);
    if (cookies) {
      this.uniqueId = JSON.parse(cookies).uniqueId;
    } else {
      this.uniqueId = Math.random().toString(36).substring(2) + (new Date()).getTime().toString(36);
      this.setCookie({
        uniqueId: this.uniqueId,
        group: '0'
      });
    }
    return this.uniqueId;
  }

  /**
   * return a feature group Letter from a cookie, A, B or if no cookie set returns 0
   */
  getFeatureGroup() {
    const cookies = this.cookies.get(FEATURE_TOOGLE_COOKIE_NAME);
    if (cookies) {
      return JSON.parse(cookies).group;
    }
    return '0';
  }

  load(): Promise<any> {
    return Promise.resolve();
  }

  setCookie(value: any) {
    const cookieName = FEATURE_TOOGLE_COOKIE_NAME;
    const cookieValue = JSON.stringify(value);
    const cookieExpires = new Date(new Date().setFullYear(new Date().getFullYear() + 1)); // one year
    const cookiePath = '/';
    const cookieDomain = environment.domain;
    const cookieSecure = false;

    this.cookies.set(cookieName, cookieValue, cookieExpires, cookiePath, cookieDomain, cookieSecure);
  }

  /**
   * sets the cookie for the first time, and also sets the feature toggle variables
   * @param data response from endpoint
   */
  handleFeatureResponse(data: any) {
    const response = JSON.parse(data.body);
    if (response.featureGroup) {
      this.setCookie({
        uniqueId: this.uniqueId,
        group: response.featureGroup
      });
      this.featureConfig = response.config;
      // add data to datalayer for GA
      if (response.ga) {
        window['dataLayer'].push(response.ga);
      }
    }
  }
}
