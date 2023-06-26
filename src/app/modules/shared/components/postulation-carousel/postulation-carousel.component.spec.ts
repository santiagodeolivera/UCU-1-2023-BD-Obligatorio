import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostulationCarouselComponent } from './postulation-carousel.component';

describe('PostulationCarouselComponent', () => {
  let component: PostulationCarouselComponent;
  let fixture: ComponentFixture<PostulationCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostulationCarouselComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostulationCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
