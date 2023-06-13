import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NecessityDetailPageComponent } from './necessity-detail-page.component';

describe('NecessityDetailPageComponent', () => {
  let component: NecessityDetailPageComponent;
  let fixture: ComponentFixture<NecessityDetailPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NecessityDetailPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NecessityDetailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
