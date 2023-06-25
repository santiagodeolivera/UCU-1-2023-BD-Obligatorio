import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NecessityCarouselComponent } from './necessity-carousel.component';

describe('NecessityCarouselComponent', () => {
  let component: NecessityCarouselComponent;
  let fixture: ComponentFixture<NecessityCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NecessityCarouselComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NecessityCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
