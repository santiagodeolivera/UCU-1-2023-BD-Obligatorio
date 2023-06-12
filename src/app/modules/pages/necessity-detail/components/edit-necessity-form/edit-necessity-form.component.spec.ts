import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditNecessityFormComponent } from './edit-necessity-form.component';

describe('EditNecessityFormComponent', () => {
  let component: EditNecessityFormComponent;
  let fixture: ComponentFixture<EditNecessityFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditNecessityFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditNecessityFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
