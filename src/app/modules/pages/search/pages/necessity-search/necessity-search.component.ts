import { Component, OnInit } from '@angular/core';
import { INecessitySearchRequest, ISearchResult } from 'src/app/modules/core/interfaces';
import { NecessityService } from 'src/app/modules/core/services/necessity.service';

@Component({
  selector: 'app-necessity-search',
  templateUrl: './necessity-search.component.html',
  styleUrls: ['./necessity-search.component.scss']
})
export class NecessitySearchComponent implements OnInit {

  isLoading: boolean = false;
  searchResults?: ISearchResult[];

  constructor(
    private necessityService: NecessityService
  ) { }

  ngOnInit(): void {
  }

  handleSearch($event: INecessitySearchRequest) {
    this.isLoading = true;
    this.necessityService.getNecessitiesByFilters($event)
    .subscribe(response => {
      this.isLoading = false;

      if (response.success) {
        this.searchResults = response.data!;
        return;
      }

      // TODO: SHOW ERROR
    });
  }
}
