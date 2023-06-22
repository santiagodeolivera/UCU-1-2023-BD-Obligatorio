import { Component, OnInit } from '@angular/core';
import { INecessitySearchRequest, ISearchResult } from 'src/app/modules/core/interfaces';
import { NecessityService } from 'src/app/modules/core/services/necessity.service';
import { SnackbarService } from 'src/app/modules/core/services/snackbar.service';

@Component({
  selector: 'app-necessity-search',
  templateUrl: './necessity-search.component.html',
  styleUrls: ['./necessity-search.component.scss']
})
export class NecessitySearchComponent implements OnInit {

  isLoading: boolean = false;
  searchResults?: ISearchResult[];

  constructor(
    private necessityService: NecessityService,
    private snackbarService: SnackbarService
  ) { }

  ngOnInit(): void {
  }

  handleSearch($event: INecessitySearchRequest) {
    this.isLoading = true;
    console.log($event);
    this.necessityService.getNecessitiesByFilters($event)
    .subscribe(response => {
      this.isLoading = false;

      if (response.success) {
        this.searchResults = response.data!;
        return;
      }

      this.snackbarService.openSnackBar(
        'Hubo un error buscando necesidades. Por favor intenta de nuevo más tarde.',
        'Aceptar'
      );
    });
  }
}
