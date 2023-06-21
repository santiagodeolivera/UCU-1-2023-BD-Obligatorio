import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNecessityFormComponent } from './create-necessity-form.component';

describe('CreateNecessityFormComponent', () => {
  let component: CreateNecessityFormComponent;
  let fixture: ComponentFixture<CreateNecessityFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateNecessityFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateNecessityFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
