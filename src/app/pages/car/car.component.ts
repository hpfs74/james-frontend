import { Component, OnInit } from '@angular/core';
import { Vehicle } from '../../models/vehicle';

@Component({
  selector: 'ki-car',
  styleUrls: ['car.component.scss'],
  templateUrl: 'car.component.html'
})
export class CarComponent implements OnInit {

  myCar: Vehicle;

  ngOnInit() {

    this.myCar = {
      name: 'PANDA',
      manufacturer: 'FIAT',
      model: 'TURBO',
      year: 2006
    };

    return;
  }
}
