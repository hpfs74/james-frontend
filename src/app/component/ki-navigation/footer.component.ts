import { Component, Input } from '@angular/core';
import { Section, Nav } from '../../models/nav.d';

/**
 * @description
 * KnabFooterComponent handle to footer of the page
 */
@Component({
  selector: 'ki-footer',
  template: `
    <div class="footer footer--mod">
      <div class="cx-container-fluid">
        <div class="cx-row">
          <div class="cx-col-md-3 cx-col-sm-6 cx-col-xs-6">
            <ul class="nav nav-pills nav-stacked">
              <li>
                <h2>Oplossingen</h2>
              </li>
              <li><a href="https://www.knab.nl/sparen">Sparen</a></li>
              <li><a href="https://www.knab.nl/betalen">Betalen</a></li>
              <li><a href="https://www.knab.nl/beleggen">Beleggen</a></li>
              <li><a href="https://www.knab.nl/financieel-overzicht">Financieel overzicht</a></li>
              <li><a href="https://www.knab.nl/hypotheken">Hypotheken</a></li>
              <li><a href="https://www.knab.nl/crowdfunding-investeren-lenen">Crowdfunding</a></li>
              <li></li>
            </ul>
          </div>
          <div class="cx-col-md3 cx-col-sm-6 cx-col-xs-6">
            <ul class="nav nav-pills nav-stacked">
              <li>
                <h2>Pakketten</h2>
              </li>
              <li><a href="https://www.knab.nl/knab-plus">Plus</a></li>
              <li><a href="https://www.knab.nl/knab-premium">Premium</a></li>
              <li><a href="https://www.knab.nl/knab-zakelijk">Zakelijk</a></li>
              <li><a href="https://www.knab.nl/kosten-bankrekening-vergelijken">Bereken je voordeel</a></li>
              <li><a href="https://www.knab.nl/rente-tarieven">Rente &amp; tarieven</a></li>
              <li></li>
            </ul>
          </div>
          <div class="cx-clearfix cx-visible-xs-block cx-visible-sm-block"></div>
          <div class="cx-col-md3 cx-col-sm-6 cx-col-xs-6">
            <ul class="nav nav-pills nav-stacked">
              <li>
                <h2>Over Knab</h2>
              </li>
              <li><a href="https://www.knab.nl/wat-is-knab">Wat is Knab</a></li>
              <li><a href="https://www.knab.nl/veiligheid">Je geld is veilig</a></li>
              <li><a href="https://www.knab.nl/pers">Pers</a></li>
              <li><a href="https://www.knab.nl/vacatures">Werken bij Knab</a></li>
              <li></li>
            </ul>
          </div>
          <div class="cx-col-md3 cx-col-sm-6 cx-col-xs-6">
            <ul class="nav nav-pills nav-stacked bg-knab">
              <li>
                <h2>Service &amp; contact</h2>
              </li>
              <li><a href="https://community.knab.nl">Forum</a></li>
              <li><a href="https://blog.knab.nl">Blog</a></li>
              <li><a href="https://www.knab.nl/contact/veelgestelde-vragen">Veelgestelde vragen</a></li>
              <li><a href="https://www.knab.nl/betalen/overstapservice">Overstapservice</a></li>
              <li><a href="https://www.knab.nl/contact">Contact</a></li>
              <li></li>
            </ul>
          </div>
        </div>
        <div class="cx-row colophon">
          <div class="cx-col-md12 cx-col-sm-12 cx-col-xs-12">
            <div class="social pull-left">
              <a href="https://www.facebook.com/knab.nl" target="_blank" alt=""><i class="fa fa-facebook-square fa-lg"></i></a>
              <a href="https://twitter.com/@knab_nl" target="_blank" alt=""><i class="fa fa-twitter-square fa-lg"></i></a>
              <a href="https://www.linkedin.com/company/knab" target="_blank" alt=""><i class="fa fa-linkedin-square fa-lg"></i></a>
              <a href="https://plus.google.com/+KnabNL/posts" target="_blank" alt="" rel="publisher">
                <i class="fa fa-google-plus-square fa-lg"></i>
              </a>
              <a href="https://www.youtube.com/channel/UCbE7S5QalEvWDVTk_5HWzxA" target="_blank" alt="">
                <i class="fa fa-youtube-square fa-lg"></i>
              </a>
            </div>
            <div class="cx-clearfix cx-visible-xs-block cx-visible-sm-block"></div>
            <ul class="nav nav-pills">
              <li>© Knab</li>
              <li>| </li>
              <li><a href="https://www.knab.nl/privacybeleid">Privacybeleid</a></li>
              <li>-</li>
              <li><a href="https://www.knab.nl/belangenbeleid">Belangenbeleid</a></li>
              <li>-</li>
              <li><a href="https://www.knab.nl/disclaimer">Disclaimer</a></li>
              <li>-</li>
              <li><a href="https://www.knab.nl/cookies">Cookie-instellingen</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  `
})
export class FooterComponent {
  @Input() socialIcons: boolean = false;
  @Input() sections: Array<Section>;
}
