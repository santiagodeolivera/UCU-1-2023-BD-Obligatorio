import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarDrawerContentComponent } from './navbar-drawer-content.component';

describe('NavbarDrawerContentComponent', () => {
  let component: NavbarDrawerContentComponent;
  let fixture: ComponentFixture<NavbarDrawerContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavbarDrawerContentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarDrawerContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
