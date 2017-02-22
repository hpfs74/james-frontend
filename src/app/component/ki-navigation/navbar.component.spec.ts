import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By, BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './navbar.component';
import { Nav } from '../../models/nav';

describe('Component: Navbar', () => {
    let comp: NavbarComponent;
    let fixture: ComponentFixture<NavbarComponent>;
    let de: DebugElement;
    let el: HTMLElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [NavbarComponent],
            imports: []
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(NavbarComponent);
        comp = fixture.componentInstance;
        comp.MenuItems = [
            { Id: 'about', Title: 'About' }
        ];

        fixture.detectChanges();
    });

    it('should display the title', () => {
        let inputDe = fixture.debugElement.query(By.css('ul.navbar-nav'));
        let el = inputDe.nativeElement;

        expect(el).not.toBeNull();
    });
});
