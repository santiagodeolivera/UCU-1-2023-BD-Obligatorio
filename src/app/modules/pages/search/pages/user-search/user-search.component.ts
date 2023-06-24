import { Component, OnInit } from '@angular/core';
import { ISearchResult, IUserSearchRequest } from 'src/app/modules/core/interfaces';
import { SnackbarService } from 'src/app/modules/core/services/snackbar.service';
import { UserService } from 'src/app/modules/core/services/user.service';

@Component({
  selector: 'app-search',
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.scss']
})
export class UserSearchComponent implements OnInit {

  isLoading: boolean = false;
  hasSearched: boolean = false;
  searchResults?: ISearchResult[];

  constructor(
    private userService: UserService,
    private snackbarService: SnackbarService
  ) { }

  ngOnInit(): void {
  }

  handleSearch($event: IUserSearchRequest) {
    this.isLoading = true;
    this.hasSearched = true;

    this.userService.getUsersByFilters($event)
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
