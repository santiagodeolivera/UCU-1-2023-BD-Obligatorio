import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillChipListComponent } from './skill-chip-list.component';

describe('SkillChipListComponent', () => {
  let component: SkillChipListComponent;
  let fixture: ComponentFixture<SkillChipListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SkillChipListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SkillChipListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
