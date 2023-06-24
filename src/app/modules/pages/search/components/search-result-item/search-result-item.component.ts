import { Component, Input, OnInit } from '@angular/core';
import { ISearchResult } from 'src/app/modules/core/interfaces';

@Component({
  selector: 'app-search-result-item',
  templateUrl: './search-result-item.component.html',
  styleUrls: ['./search-result-item.component.scss']
})
export class SearchResultItemComponent implements OnInit {

  @Input() searchResult!: ISearchResult;
  @Input() enableSkillModal: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
