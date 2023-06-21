import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NecessityDetailActionsComponent } from './necessity-detail-actions.component';

describe('NecessityDetailActionsComponent', () => {
  let component: NecessityDetailActionsComponent;
  let fixture: ComponentFixture<NecessityDetailActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NecessityDetailActionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NecessityDetailActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
