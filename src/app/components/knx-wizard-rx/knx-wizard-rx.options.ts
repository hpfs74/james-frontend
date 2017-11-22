
import { Route } from '@angular/router';
import { Observable } from 'rxjs/Observable';

export interface KNXWizardStepRxOptions {
  routeConfig: Route;
  label?: string;
  nextButtonLabel?: string;
  backButtonLabel?: string;
  nextButtonClass?: string;
  backButtonClass?: string;
  hideNextButton?: boolean;
  hideBackButton?: boolean;
  disableNextButton?: boolean;
  disableBackButton?: boolean;
  componentOptions?: any;
  onBeforeShow?: () => Observable<any>;
  onBeforeNext?: () => Observable<any>;
  onBeforeBack?: () => Observable<any>;
  onShowStep?: () => void;
}

export interface KNXStepError {
  message: string;
}

export const DEFAULT_OPTIONS = {
  nextButtonLabel: 'Next',
  backButtonLabel: 'Previous',
  finishButtonLabel: 'Finish'
};

export const DEFAULT_OPTIONS_KNXSTEP = {
  label: 'Step label',
  disableNextButton: false,
  disableBackButton: false
};
