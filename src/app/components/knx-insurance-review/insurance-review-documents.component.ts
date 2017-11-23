import { Component, Input } from '@angular/core';

import { InsuranceDocument } from './../../insurance/models';

@Component({
  selector: 'knx-insurance-review-documents',
  styleUrls: ['./insurance-review-documents.component.scss'],
  template: `
    <knx-collapsible-panel [title]="title">
      <div class="knx-collapsible-panel__content">
        <div class="row">
          <div class="col-sm-12">
            <span>Hier vind je de voorwaarden van de gekozen verzekering.</span><br>
            <span class="knx-collapse-panel__muted">
              In deze lijst staan ook alle voorwaarden voor extra dekkingen. Heb je deze extra’s niet geselecteerd?
              Dan kun je deze natuurlijk negeren.
            </span>

            <span class="knx-info-icon knx-icon-info-circle" style="cursor: pointer;">
              <knx-tooltip>
                <p>In de documenten staan de polisvoorwaarden. Daarin lees je bijvoorbeeld waar je precies voor gedekt bent,
                welke vergoeding je ontvangt bij een schade en of je een vrije keuze hebt voor het bedrijf dat je schade
                gaat herstellen.</p>
                <p>In de documentlijst staan ook de voorwaarden voor extra dekkingen. Heb je die niet geselecteerd?
                Dan kun je die natuurlijk negeren.</p>
              </knx-tooltip>
            </span>
          </div>
        </div>

        <!-- documents -->
        <div class="row">
          <div class="col-sm-12">
            <ul class="knx-insurance-review-documents__list">
              <li *ngFor="let doc of documents"><span class="knx-icon-file-o"></span>
                <a href="{{doc.url}}}" target="_blank" rel="noopener" title="{{doc.name}}">{{doc.name}}</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </knx-collapsible-panel>
  `
})
export class InsuranceReviewDocumentsComponent {
  @Input() title: string;
  @Input() documents: Array<InsuranceDocument>;
}
