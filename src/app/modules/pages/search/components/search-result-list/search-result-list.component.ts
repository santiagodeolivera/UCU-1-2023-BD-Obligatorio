import { Component, Input, OnInit } from '@angular/core';
import { ISearchResult } from 'src/app/modules/core/interfaces';

@Component({
  selector: 'app-search-result-list',
  templateUrl: './search-result-list.component.html',
  styleUrls: ['./search-result-list.component.scss']
})
export class SearchResultListComponent implements OnInit {

  @Input() searchResults: ISearchResult[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
