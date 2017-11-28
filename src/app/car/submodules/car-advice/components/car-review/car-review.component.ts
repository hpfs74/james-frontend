import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../../../reducers';
import * as fromInsurance from '../../../../../insurance/reducers';
import { Observable } from 'rxjs/Observable';
import { QaIdentifiers } from '../../../../../shared/models/qa-identifiers';

@Component({
  selector: 'knx-car-review',
  templateUrl: './car-review.component.html',
})
export class CarReviewComponent {
  qaRootId = QaIdentifiers.carAdviceRoot;
  selectedInsurance$: Observable<any>;
  constructor(private store$: Store<fromRoot.State>) {
    this.selectedInsurance$ = this.store$.select(fromInsurance.getSelectedInsurance);
  }
}
