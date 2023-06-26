import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NecessityCardComponent } from './necessity-card.component';

describe('NecessityCardComponent', () => {
  let component: NecessityCardComponent;
  let fixture: ComponentFixture<NecessityCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NecessityCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NecessityCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
