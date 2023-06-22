import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { MatExpansionPanel } from '@angular/material/expansion';
import { IUserSearchRequest } from 'src/app/modules/core/interfaces';

@Component({
  selector: 'app-user-search-form',
  templateUrl: './user-search-form.component.html',
  styleUrls: ['./user-search-form.component.scss']
})
export class UserSearchFormComponent implements OnInit {

  userSearchForm = this.fb.group({
    firstName: new FormControl<string | undefined>(undefined),
    lastName: new FormControl<string | undefined>(undefined),
    skills: new FormControl<string[] | undefined>(undefined)
  });

  @Output() search = new EventEmitter<IUserSearchRequest>();
  @ViewChild(MatExpansionPanel) filtersPanel?: MatExpansionPanel;

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
  }

  handleSubmit() {
    if (!this.userSearchForm.valid) return;

    const { skills, firstName, lastName } = this.userSearchForm.value;

    const searchRequest: IUserSearchRequest = {
      firstName: firstName || undefined,
      lastName: lastName || undefined,
      skills: skills || undefined,
    };

    this.search.emit(searchRequest);
    this.filtersPanel?.close();
  }
}
