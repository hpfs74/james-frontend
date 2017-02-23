import { Component, OnInit } from '@angular/core';
import { Vehicle } from '../../models/vehicle';

@Component({
  selector: 'ki-overview',
  template: require('./car.component.html')
})
export class CarComponent implements OnInit {

  myCar: Vehicle;

  ngOnInit() {

    this.myCar = {
      name: 'PANDA',
      manufacturer: 'FIAT',
      model: 'TURBO'
    };

    return;
  }
}
