import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ISkill } from 'src/app/modules/core/interfaces';
import { SkillDialogComponent } from '../skill-dialog/skill-dialog.component';

@Component({
  selector: 'app-skill-chip',
  templateUrl: './skill-chip.component.html',
  styleUrls: ['./skill-chip.component.scss']
})
export class SkillChipComponent implements OnInit {

  @Input() skill!: ISkill;
  @Input() color: string = '';
  @Input() selected: boolean = false;
  @Input() enableSkillModal: boolean = false;

  constructor(
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  openSkillDialog() {
    if (!this.enableSkillModal) return;

    this.dialog.open(SkillDialogComponent, {
      data: this.skill
    });
  }

}
