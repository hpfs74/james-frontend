import { Component, OnInit } from '@angular/core';
import { Vehicle } from '../../models/vehicle';

@Component({
  selector: 'ki-car-page',
  styleUrls: ['car-page.component.scss'],
  templateUrl: 'car-page.component.html'
})
export class CarPageComponent implements OnInit {

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
