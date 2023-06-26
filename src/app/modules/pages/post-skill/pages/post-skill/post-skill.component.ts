import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-post-skill',
  templateUrl: './post-skill.component.html',
  styleUrls: ['./post-skill.component.scss']
})
export class PostSkillComponent implements OnInit {
  isLoading: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

}
