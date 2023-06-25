import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NecessityPostulationCardComponent } from './necessity-postulation-card.component';

describe('NecessityPostulationCardComponent', () => {
  let component: NecessityPostulationCardComponent;
  let fixture: ComponentFixture<NecessityPostulationCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NecessityPostulationCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NecessityPostulationCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
