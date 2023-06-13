import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNecessityPageComponent } from './create-necessity-page.component';

describe('CreateNecessityPageComponent', () => {
  let component: CreateNecessityPageComponent;
  let fixture: ComponentFixture<CreateNecessityPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateNecessityPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateNecessityPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
