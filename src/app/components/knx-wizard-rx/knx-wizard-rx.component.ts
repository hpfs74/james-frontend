import {
  OnInit, EventEmitter, Component, ViewChild,
  ElementRef, Input, Output, ContentChild
} from '@angular/core';
import { Router, Route, ActivatedRoute, NavigationEnd } from '@angular/router';
import { KNXStepRxComponent } from './knx-step-rx.component';
import { KNXWizardStepRxOptions, KNXStepError } from './knx-wizard-rx.options';
import { KNXWizardRxService } from './knx-wizard-rx.service';
import { scrollToY } from '../../utils/scroll-to-element.utils';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import * as fromWizard from './knx-wizard-rx.actions';
import * as fromRoot from '../../reducers';

import { Store } from '@ngrx/store';
// TODO add animations
declare var window: any;
@Component({
  selector: 'knx-wizard-rx',
  styleUrls: ['./knx-wizard-rx.component.scss'],
  templateUrl: './knx-wizard-rx.component.html',
})
export class KNXWizardRxComponent implements OnInit {
  @ContentChild('knxWizardSidebar') sidebar: ElementRef;
  @ViewChild('prevButton') prevButton: ElementRef;
  @ViewChild('nextButton') nextButton: ElementRef;
  @Input() stepOptions: KNXWizardStepRxOptions[];
  @Output() onStepChange: EventEmitter<number> = new EventEmitter<number>();
  currentComponent: any | KNXStepRxComponent;
  currentStepOptions: KNXWizardStepRxOptions;
  subscription$: Subscription[] = [];
  error: KNXStepError;
  constructor(private store$: Store<fromRoot.State>,
              public knxWizardRxService: KNXWizardRxService) {
    window.wizard = this;
    window.fromWizard = fromWizard;
  }

  ngOnInit() {
    if (this.stepOptions) {
      this.currentStepOptions = this.stepOptions[this.knxWizardRxService.currentStepIndex];
    }
    this.knxWizardRxService.routeObservable.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentStepOptions = this.stepOptions[this.knxWizardRxService.currentStepIndex];
        this.onStepChange.emit(this.knxWizardRxService.currentStepIndex);
      }
    });
  }

  onActivate(componentRef: any): void {
    scrollToY();
    this.currentComponent = componentRef;
    if (this.stepOptions) {
      this.onShowStep();
    }
    this.blurButtons();
    this.clearErrors();
  }

  onDeactivate() {
    this.subscription$.forEach(subscription => subscription.unsubscribe);
    this.subscription$ = [];
  }

  goToNextStep(): void {
    if (this.currentStepOptions.onBeforeNext) {
      this.subscription$.push(
        this.currentStepOptions.onBeforeNext().subscribe((res) => {
          this.store$.dispatch(new fromWizard.Forward());
        }, error => this.handleError(error))
      );
    } else {
      this.onNext();
    }
  }

  onNext(): void {
    if (this.currentComponent.onNext) {
      this.currentComponent.onNext().subscribe(() => {
        this.store$.dispatch(new fromWizard.Forward());
      }, error => this.handleError(error));
    }
  }

  onShowStep(): void {
    let onShowStep = this.currentStepOptions.onShowStep;
    if (onShowStep) {
      onShowStep();
    }
  }

  goToPreviousStep(stepIndex): void {
    this.store$.dispatch(new fromWizard.Go({stepIndex: stepIndex}));
  }

  handleError(err: any): void {
    // console.error('cannot move to step',err);
    this.error = err;
  }

  clearErrors() {
    this.error = undefined;
  }

  blurButtons() {
    if (this.prevButton) {
      this.prevButton.nativeElement.blur();
    }
    if (this.nextButton) {
      this.nextButton.nativeElement.blur();
    }
  }
}
