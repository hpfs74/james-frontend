import { Injectable } from '@angular/core';
import { environment } from '@env/environment';

@Injectable()
export class LoadScriptsService {
  constructor() {
    this.initScripts();
    // console.log(1);
  }

  initScripts() {
    this.setAbScriptToHead();
    this.setFormisimoScripts();
  }

  load(): Promise<any> {
    return Promise.resolve()
      .then(() => {})
      .catch(error => this.handleError(error));
  }

  handleError(error: any) {
    return; // TODO implement correct error handling
  }

  /* tslint:disable */
  private setFormisimoScripts() {
    this.setFormissimoTrackingScript();
    this.setFormissimoConversionScript();
  }

  private setFormissimoTrackingScript() {
    let formisimoScrip = document.createElement('script');
    formisimoScrip.src = 'https://cdn-static.formisimo.com/tracking/js/tracking.js';
    document.head.insertBefore(formisimoScrip, document.head.lastChild);
  }

  private setFormissimoConversionScript() {
    let formisimoScrip = document.createElement('script');
    formisimoScrip.src = 'https://cdn-static.formisimo.com/tracking/js/conversion.js';
    document.head.insertBefore(formisimoScrip, document.head.lastChild);
  }

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
}
