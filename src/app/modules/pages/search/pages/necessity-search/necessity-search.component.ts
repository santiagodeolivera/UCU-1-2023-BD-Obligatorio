import { Component, OnInit } from '@angular/core';
import { ISearchResult } from 'src/app/modules/core/interfaces';

@Component({
  selector: 'app-necessity-search',
  templateUrl: './necessity-search.component.html',
  styleUrls: ['./necessity-search.component.scss']
})
export class NecessitySearchComponent implements OnInit {

  searchResults?: ISearchResult[];

  constructor() { }

  ngOnInit(): void {
  }

}
