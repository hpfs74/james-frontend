// import { TestBed, async } from '@angular/core/testing';
// import { AppComponent } from './app.component';

// let _ = require('lodash');

// describe('AppComponent', () => {

//   let originalTimeout = 0;
//   beforeEach(function () {
//     originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
//     jasmine.DEFAULT_TIMEOUT_INTERVAL = 100000;
//   });

//   afterEach(function () {
//     jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
//   });

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       declarations: [
//         AppComponent
//       ],
//     });
//   });

//   it('AppComponent: testing creation time', async(() => {

//     let createComponent = () => {
//       let fixture = TestBed.createComponent(AppComponent);
//       let app = fixture.debugElement.componentInstance;
//       expect(app).toBeTruthy();
//     };

//     let Benchmark = require('benchmark');
//     let suite = new Benchmark.Suite('foo');

//     suite.add('bm_createComponent', createComponent, {
//       onStart: x => console.log('Started, running cycles...'),
//       onCycle: y => { /* uncomment if you want to see all cycle events... console.log ( y ) */ },
//       onComplete: z => {
//         console.log(z.target.stats);
//       }
//     });

//     suite.run();

//   }));
// });
