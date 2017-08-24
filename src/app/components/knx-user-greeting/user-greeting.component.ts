import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'knx-user-greeting',
  template: `
    <header class="knx-user-greeting">
      <h2 *ngIf="!userName">{{ greeting }}</h2>
      <h2 *ngIf="userName">{{ greeting }}, <span class="knx-user-greeting__username">{{ userName }}</span></h2>
      <ng-content></ng-content>
    </header>
  `
})
export class UserGreetingComponent implements OnInit {
  @Input() userName: string;

  greeting: string;

  ngOnInit() {
    const hourOfDay = new Date().getHours();
    this.greeting = this.getGreeting(hourOfDay);
  }

  public getGreeting(hour: number) {
    if (this.between(hour, 6, 12)) {
      // morning
      return 'Goedemorgen';
    } else if (this.between(hour, 12, 18)) {
      // afternoon
      return 'Goedemiddag';
    } else if (this.between(hour, 18, 23)) {
      // evening
      return 'Goedenavond';
    } else if (this.between(hour, 0, 6) && hour > 0) {
      // night
      return 'Goedenacht';
    }
    return 'Hallo';
  }

  private between(num, min, max) {
    return num >= min && num <= max;
  }
}
