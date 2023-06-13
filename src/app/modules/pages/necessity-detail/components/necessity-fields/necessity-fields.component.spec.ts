import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NecessityFieldsComponent } from './necessity-fields.component';

describe('NecessityFieldsComponent', () => {
  let component: NecessityFieldsComponent;
  let fixture: ComponentFixture<NecessityFieldsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NecessityFieldsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NecessityFieldsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
