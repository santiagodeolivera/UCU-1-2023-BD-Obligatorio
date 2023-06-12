import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NecessityPostulationListComponent } from './necessity-postulation-list.component';

describe('NecessityPostulationListComponent', () => {
  let component: NecessityPostulationListComponent;
  let fixture: ComponentFixture<NecessityPostulationListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NecessityPostulationListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NecessityPostulationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
