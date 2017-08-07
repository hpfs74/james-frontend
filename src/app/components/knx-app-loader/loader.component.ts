import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { LoaderService } from './loader.service';
import { LoaderState } from './loader';

@Component({
  selector: 'knx-app-loader',
  template: `
    <div class="container knx-container--fullwidth knx-app-loader">
      <div class="col-md-8 col-offset-4">
        <knx-loader [visible]="show">Bezig met laden ...</knx-loader>
      </div>
    </div>
  `
})
export class AppLoaderComponent implements OnInit, OnDestroy {

  public show = false;

  private subscription: Subscription;

  constructor(private loaderService: LoaderService) { }

  ngOnInit() {
    this.subscription = this.loaderService.loaderState
      .subscribe((state: LoaderState) => {
        this.show = state.show;
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
