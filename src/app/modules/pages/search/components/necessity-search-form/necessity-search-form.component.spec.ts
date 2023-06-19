import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NecessitySearchFormComponent } from './necessity-search-form.component';

describe('NecessitySearchFormComponent', () => {
  let component: NecessitySearchFormComponent;
  let fixture: ComponentFixture<NecessitySearchFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NecessitySearchFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NecessitySearchFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
