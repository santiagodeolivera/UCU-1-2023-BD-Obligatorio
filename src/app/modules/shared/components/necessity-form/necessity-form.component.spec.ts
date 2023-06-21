import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NecessityFormComponent } from './necessity-form.component';

describe('NecessityFormComponent', () => {
  let component: NecessityFormComponent;
  let fixture: ComponentFixture<NecessityFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NecessityFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NecessityFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
