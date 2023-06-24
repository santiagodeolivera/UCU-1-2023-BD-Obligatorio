import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NecessitySearchComponent } from './necessity-search.component';

describe('NecessitySearchComponent', () => {
  let component: NecessitySearchComponent;
  let fixture: ComponentFixture<NecessitySearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NecessitySearchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NecessitySearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
