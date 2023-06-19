import { Component, OnInit } from '@angular/core';
import { ISearchResult } from 'src/app/modules/core/interfaces';

@Component({
  selector: 'app-search',
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.scss']
})
export class UserSearchComponent implements OnInit {

  searchResults?: ISearchResult[];

  constructor() { }

  ngOnInit(): void {
  }

}
