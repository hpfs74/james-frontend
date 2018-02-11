import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { slideUpDownAnimation } from '../../shared/animations/slide-up-down.animation';
import { environment } from '@env/environment';

@Component({
  selector: 'knx-technical-issue-bar',
  styleUrls: ['./technical-issue.component.scss'],
  template: `
    <div [hidden]="!show" [@slideUpDownAnimation]="getAnimationState()" class="knx-technical-issue-bar">
      <div class="knx-technical-issue-bar__message">
        Sorry. Er is een tijdelijke storing. Wij doen er alles aan dit zo snel mogelijk op te lossen.
      </div>
    </div>`,
  animations: [slideUpDownAnimation]
})
export class TechnicalIssueBarComponent {
  @Input() show: boolean;

  getAnimationState() {
    return this.show ? 'in' : 'out';
  }
}

@Component({
  selector: 'knx-technical-issue',
  template: `
    <knx-technical-issue-bar [show]="isTechnicalIssue"></knx-technical-issue-bar>`
})
export class TechnicalIssueComponent {
  isTechnicalIssue: boolean;

  constructor() {
    this.isTechnicalIssue = environment.technicalIssue;
  }
}
