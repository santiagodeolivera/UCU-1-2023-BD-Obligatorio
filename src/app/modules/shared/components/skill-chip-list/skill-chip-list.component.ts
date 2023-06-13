import { Component, OnInit, Input } from '@angular/core';
import { ISkill } from 'src/app/modules/core/interfaces';

@Component({
  selector: 'app-skill-chip-list',
  templateUrl: './skill-chip-list.component.html',
  styleUrls: ['./skill-chip-list.component.scss']
})
export class SkillChipListComponent implements OnInit {

  @Input() skills!: ISkill[];

  constructor() { }

  ngOnInit(): void {
  }

}
