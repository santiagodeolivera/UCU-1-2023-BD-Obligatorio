import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NecessityEditPageComponent } from './necessity-edit-page.component';

describe('NecessityEditPageComponent', () => {
  let component: NecessityEditPageComponent;
  let fixture: ComponentFixture<NecessityEditPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NecessityEditPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NecessityEditPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
