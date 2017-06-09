import { Component, Input, AfterViewInit } from '@angular/core';

@Component({
  selector: 'knx-user-greeting',
  template: `
    <header class="knx-user-greeting">
      <h2>{{ greeting }}, <span class="knx-user-greeting__username">{{ userName }}</span></h2>
      <ng-content></ng-content>
    </header>
  `
})
export class UserGreetingComponent implements AfterViewInit {
  @Input() userName: string;

  greeting: string;

  ngAfterViewInit() {
    let hourOfDay = new Date().getHours();
    this.greeting = this.getGreeting(hourOfDay);
  }

  private getGreeting(hour: number) {
    if (this.between(hour, 6, 12)) {
      // morning
      return 'Goedemorgen';
    } else if (this.between(hour, 12, 18)) {
      // afternoon
      return 'Goedemiddag';
    } else if (this.between(hour, 18, 0)) {
      // evening
      return 'Goedenavond';
    } else if (this.between(hour, 0, 6)) {
      // night
      return 'Goedenacht';
    }
  }

  private between(num, min, max) {
    return num >= min && num <= max;
  }
}
