import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Http } from '@angular/http';

@Injectable()
export class LoadScriptsService {
  constructor(private http: Http) {
    this.initScripts();
    if (!environment.production) {
      this.addCSP();
    }
  }

  initScripts() {
    this.setAbScriptToHead();
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


  private addCSP() {
    this.generateCSP().then((csp) => {
      const meta = document.createElement('meta');
      meta.httpEquiv = "Content-Security-Policy";
      meta.content = csp;
      document.head.insertBefore(meta, document.head.firstChild);
    });
  }


  private generateCSP():Promise<string> {
    /** Fallback object */
    const defaultContentSecurityPolicy = {
      "default-src": [
        "'unsafe-inline'",
        "'self'",
        "https://www.google-analytics.com",
        "https://www.googletagmanager.com",
        "http://aegon-middleware-qa.mobgen.com",
        "https://middleware.test.knabverzekeren.nl",
        "https://middleware.verzekeren.knab.nl",
        "https://middleware.uat.knabverzekeren.nl",
        "https://knab-dev.apigee.net",
        "https://knab-acc.apigee.net",
        "https://knab-prd.apigee.net",
        "https://api.test.knabverzekeren.nl",
        "https://cdn-static.formisimo.com",
        "https://tracking.formisimo.com",
        "https://code.jquery.com"
      ],
      "img-src": [
        "'self'",
        "data:",
        "https://ssl.google-analytics.com",
        "https://www.google.com",
        "https://www.google.nl",
        "https://www.google-analytics.com",
        "https://*.visualwebsiteoptimizer.com",
        "https://www.facebook.com",
        "https://googleads.g.doubleclick.net",
        "https://www.googleadservices.com",
        "https://secure.adnxs.com",
        "https://ib.adnxs.com",
        "https://www.facebook.com/tr/",
        "https://secure.adnxs.com",
        "https://www.at19.net",
        "https://knab.blueconic.net",
        "https://stats.g.doubleclick.net",
        "https://ad.doubleclick.net/ddm/activity/src=8163947",
        "https://secure.adnxs.com",
        "https://www.google.nl",
        "https://www.google-analytics.com",
        "https://stats.g.doubleclick.net",
        "http://placehold.it",
        "https://www.google.com/ads",
        "https://www.gstatic.com",
        "https://d3cuj82m9z5zxb.cloudfront.net",
        "http://*.visualwebsiteoptimizer.com",
        "https://*.cloudfront.net",
        "http://w.usabilla.com",
        "https://knab-dev.apigee.net",
		"https://knab-prd.apigee.net",
		"https://knab-acc.apigee.net"
      ],
      "script-src": [
        "'unsafe-inline'",
        "'self'",
        "'unsafe-eval'",
        "http://www.googleadservices.com",
        "https://www.google-analytics.com",
        "https://www.gstatic.com",
        "https://www.google.com",
        "https://ajax.googleapis.com",
        "https://cdnjs.cloudflare.com",
        "https://www.google-analytics.com",
        "https://*.visualwebsiteoptimizer.com",
        "https://connect.facebook.net",
        "https://www.googletagmanager.com",
        "https://ssl.google-analytics.com",
        "https://www.googleadservices.com",
        "https://knab.blueconic.net",
        "https://apis.google.com",
        "https://googleads.g.doubleclick.net/pagead/viewthroughconversion/837300153",
        "https://cdn-static.formisimo.com",
        "http://w.usabilla.com",
        "http://code.jquery.com",
        "http://tracking.formisimo.com"
      ],
      "style-src": [
        "'unsafe-inline'",
        "'self'"
      ],
      "frame-src": [
        "'self'",
        "https://www.google.com/recaptcha/",
        "https://*.cobrowse.liveperson.net",
        "https://lpcdn.lpsnmedia.net",
        "https://quadia.webtvframework.com",
        "https://bid.g.doubleclick.net",
        "https://8163947.fls.doubleclick.net",
        "https://connect.facebook.net",
        "https://staticxx.facebook.com/ https://mods.netb.nl"
      ],
      "connect-src": [
        "'self'",
        "https://knab.blueconic.net",
        "https://login.test.knabverzekeren.nl:8002/token",
        "https://www.googletagmanager.com",
        "https://www.google-analytics.com",
        "https://middleware.test.knabverzekeren.nl",
        "https://middleware.verzekeren.knab.nl",
        "https://middleware.uat.knabverzekeren.nl",
        "https://knab-dev.apigee.net",
        "https://knab-acc.apigee.net",
        "https://knab-prd.apigee.net",
        "https://api.test.knabverzekeren.nl",
        "https://d3cuj82m9z5zxb.cloudfront.net",
        "https://www.google.com/ads/user-lists/837300153",
        "https://dev.visualwebsiteoptimizer.com/",
        "https://j58eycphw6.execute-api.eu-west-1.amazonaws.com",
        "https://cdn-static.formisimo.com",
        "http://w.usabilla.com",
        "http://code.jquery.com",
        "http://tracking.formisimo.com"
      ],
      "object-src": [
        "'none'"
      ]
    };

    const fallbackReturn = () => Object.keys(defaultContentSecurityPolicy).reduce( (acc, el) => `${acc} ${this.buildTag(el, defaultContentSecurityPolicy[el])}`, "");

    /**
     * We request the root URL's page to get its headers so that we can extract the
     * 'Content-Security-Policy' header.
     * If we fail to access the page or the page doesn't have the header, we return
     * the fallback.
     */
    return this.http.request('/')
      .toPromise()
      .then((res) => {
        const headerName = 'Content-Security-Policy';
        if (res.headers.has(headerName)) {
          return res.headers.get(headerName);
        }

        return fallbackReturn();
      })

      /** On error returns default CSP */
      .catch(() => {
        return fallbackReturn();
      });
  }

  private buildTag(tag, val) {
    let ret = "";
    if (val) {
      if (Array.isArray(val) && val.length > 0) {
        ret = `${tag} ${val.reduce((acc, el) => acc + " " + el)}; `;
      }

      if (typeof(val) === "string") {
        ret = `${tag} ${val}; `;
      }
    }

    return ret;
  }
  /* tslint:enable */
}
