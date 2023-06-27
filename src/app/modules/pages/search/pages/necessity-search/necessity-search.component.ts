import { Component, OnInit } from '@angular/core';
import { INecessitySearchRequest, ISearchResult } from 'src/app/modules/core/interfaces';
import { AuthService } from 'src/app/modules/core/services/auth.service';
import { NecessityService } from 'src/app/modules/core/services/necessity.service';
import { SnackbarService } from 'src/app/modules/core/services/snackbar.service';

@Component({
  selector: 'app-necessity-search',
  templateUrl: './necessity-search.component.html',
  styleUrls: ['./necessity-search.component.scss']
})
export class NecessitySearchComponent implements OnInit {

  isLoading: boolean = false;
  hasSearched: boolean = false;
  searchResults?: ISearchResult[];

  get runningUserId(): string {
    return this.authService.runningUser?.id!;
  }

  constructor(
    private necessityService: NecessityService,
    private snackbarService: SnackbarService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  handleSearch($event: INecessitySearchRequest) {
    this.isLoading = true;
    this.hasSearched = true;

    this.necessityService.getNecessitiesByFilters($event)
    .subscribe(response => {
      this.isLoading = false;

      if (response.success) {
        this.searchResults = response.data!.filter(value => value.relatedUserId !== this.runningUserId);
        return;
      }

      this.snackbarService.openSnackBar(
        'Hubo un error buscando necesidades. Por favor intenta de nuevo más tarde.',
        'Aceptar'
      );
    });
  }
}
