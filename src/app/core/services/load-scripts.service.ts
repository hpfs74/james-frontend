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
    this.setGoogleScripts();
    this.setUsabillaScripts();
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

  private setGoogleScripts() {
    // Google Tag Manager
    if (environment.enableAnalytics) {
      const gtmAuth = '';
      const gtmId = environment.gtmId;
      const gtmVersion = 0;

      this.outputGtmSnippet();
      this.outputGtmNoScript();
    }
  }

  private setUsabillaScripts() {
    let usabillaScrip = document.createElement('script');

    // Encrypting usabilla script to base64 as it is overcomplicated with regexps, and two types of quotes that makes it impossible to convert to string even with backquotes
    usabillaScrip.innerHTML = window.atob('Lyp7bGl0ZXJhbH08IVtDREFUQVsqL3dpbmRvdy5saWdodG5pbmdqc3x8ZnVuY3Rpb24oYyl7ZnVuY3Rpb24gZyhiLGQpe2QmJihkKz0oL1w/Ly50ZXN0KGQpPyImIjoiPyIpKyJsdj0xIik7Y1tiXXx8ZnVuY3Rpb24oKXt2YXIgaT13aW5kb3csaD1kb2N1bWVudCxqPWIsZz1oLmxvY2F0aW9uLnByb3RvY29sLGw9ImxvYWQiLGs9MDsoZnVuY3Rpb24oKXtmdW5jdGlvbiBiKCl7YS5QKGwpO2Eudz0xO2Nbal0oIl9sb2FkIil9Y1tqXT1mdW5jdGlvbigpe2Z1bmN0aW9uIG0oKXttLmlkPWU7cmV0dXJuIGNbal0uYXBwbHkobSxhcmd1bWVudHMpfXZhciBiLGU9KytrO2I9dGhpcyYmdGhpcyE9aT90aGlzLmlkfHwwOjA7KGEucz1hLnN8fFtdKS5wdXNoKFtlLGIsYXJndW1lbnRzXSk7bS50aGVuPWZ1bmN0aW9uKGIsYyxoKXt2YXIgZD1hLmZoW2VdPWEuZmhbZV18fFtdLGo9YS5laFtlXT1hLmVoW2VdfHxbXSxmPWEucGhbZV09YS5waFtlXXx8W107YiYmZC5wdXNoKGIpO2MmJmoucHVzaChjKTtoJiZmLnB1c2goaCk7cmV0dXJuIG19O3JldHVybiBtfTt2YXIgYT1jW2pdLl89e307YS5maD17fTthLmVoPXt9O2EucGg9e307YS5sPWQ/ZC5yZXBsYWNlKC9eXC9cLy8sKGc9PSJodHRwczoiP2c6Imh0dHA6IikrIi8vIik6ZDthLnA9ezA6K25ldyBEYXRlfTthLlA9ZnVuY3Rpb24oYil7YS5wW2JdPW5ldyBEYXRlLWEucFswXX07YS53JiZiKCk7aS5hZGRFdmVudExpc3RlbmVyP2kuYWRkRXZlbnRMaXN0ZW5lcihsLGIsITEpOmkuYXR0YWNoRXZlbnQoIm9uIitsLGIpO3ZhciBxPWZ1bmN0aW9uKCl7ZnVuY3Rpb24gYigpe3JldHVyblsiPGhlYWQ+PC9oZWFkPjwiLGMsJyBvbmxvYWQ9InZhciBkPScsbiwiO2QuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2hlYWQnKVswXS4iLGQsIihkLiIsZywiKCdzY3JpcHQnKSkuIixpLCI9JyIsYS5sLCInXCI+PC8iLGMsIj4iXS5qb2luKCIiKX12YXIgYz0iYm9keSIsZT1oW2NdO2lmKCFlKXJldHVybiBzZXRUaW1lb3V0KHEsMTAwKTthLlAoMSk7dmFyIGQ9ImFwcGVuZENoaWxkIixnPSJjcmVhdGVFbGVtZW50IixpPSJzcmMiLGs9aFtnXSgiZGl2IiksbD1rW2RdKGhbZ10oImRpdiIpKSxmPWhbZ10oImlmcmFtZSIpLG49ImRvY3VtZW50IixwO2suc3R5bGUuZGlzcGxheT0ibm9uZSI7ZS5pbnNlcnRCZWZvcmUoayxlLmZpcnN0Q2hpbGQpLmlkPW8rIi0iK2o7Zi5mcmFtZUJvcmRlcj0iMCI7Zi5pZD1vKyItZnJhbWUtIitqOy9NU0lFWyBdKzYvLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCkmJihmW2ldPSJqYXZhc2NyaXB0OmZhbHNlIik7Zi5hbGxvd1RyYW5zcGFyZW5jeT0idHJ1ZSI7bFtkXShmKTt0cnl7Zi5jb250ZW50V2luZG93W25dLm9wZW4oKX1jYXRjaChzKXthLmRvbWFpbj1oLmRvbWFpbixwPSJqYXZhc2NyaXB0OnZhciBkPSIrbisiLm9wZW4oKTtkLmRvbWFpbj0nIitoLmRvbWFpbisiJzsiLGZbaV09cCsidm9pZCgwKTsifXRyeXt2YXIgcj1mLmNvbnRlbnRXaW5kb3dbbl07ci53cml0ZShiKCkpO3IuY2xvc2UoKX1jYXRjaCh0KXtmW2ldPXArJ2Qud3JpdGUoIicrYigpLnJlcGxhY2UoLyIvZyxTdHJpbmcuZnJvbUNoYXJDb2RlKDkyKSsnIicpKyciKTtkLmNsb3NlKCk7J31hLlAoMil9O2EubCYmc2V0VGltZW91dChxLDApfSkoKX0oKTtjW2JdLmx2PSIxIjtyZXR1cm4gY1tiXX12YXIgbz0ibGlnaHRuaW5nanMiLGs9d2luZG93W29dPWcobyk7ay5yZXF1aXJlPWc7ay5tb2R1bGVzPWN9KHt9KTsNCndpbmRvdy51c2FiaWxsYV9saXZlID0gbGlnaHRuaW5nanMucmVxdWlyZSgidXNhYmlsbGFfbGl2ZSIsICIvL3cudXNhYmlsbGEuY29tL2QzMDEyNmJjYmY5OS5qcyIpOw0KLypdXT57L2xpdGVyYWx9Ki8=');
    document.head.insertBefore(usabillaScrip, document.head.lastChild);
  }

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

  private outputGtmSnippet() {
    let gtmScript = document.createElement('script');
    gtmScript.innerHTML =
      `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','${environment.gtmId}');`;

    document.head.insertBefore(gtmScript, document.head.firstChild);
  }

  private outputGtmNoScript() {
    let gtmNoScript = document.createElement('noscript');
    gtmNoScript.innerHTML =
      `<iframe src="https://www.googletagmanager.com/ns.html?id=${environment.gtmId}"
      height="0" width="0" style="display:none;visibility:hidden"></iframe>`;
    document.body.insertBefore(gtmNoScript, document.body.firstChild);
  }

  /* tslint:enable */
}
