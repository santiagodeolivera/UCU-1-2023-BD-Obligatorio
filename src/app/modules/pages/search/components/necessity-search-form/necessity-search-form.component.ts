import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatExpansionPanel } from '@angular/material/expansion';

import { INecessitySearchRequest } from 'src/app/modules/core/interfaces';


@Component({
  selector: 'app-necessity-search-form',
  templateUrl: './necessity-search-form.component.html',
  styleUrls: ['./necessity-search-form.component.scss']
})
export class NecessitySearchFormComponent implements OnInit {

  necessitySearchForm = this.fb.group({
    searchTerm: new FormControl<string | undefined>(undefined),
    skills: new FormControl<string[] | undefined>(undefined),
    startDateRange: new FormGroup({
      start: new FormControl<Date | undefined>(undefined),
      end: new FormControl<Date | undefined>(undefined)
    }),
    endDateRange: new FormGroup({
      start: new FormControl<Date | undefined>(undefined),
      end: new FormControl<Date | undefined>(undefined)
    })
  });

  @Output() search = new EventEmitter<INecessitySearchRequest>();
  @ViewChild(MatExpansionPanel) filtersPanel?: MatExpansionPanel;

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
  }

  handleSubmit() {
    if (!this.necessitySearchForm.valid) return;

    const { skills, searchTerm, startDateRange, endDateRange } = this.necessitySearchForm.value;

    const searchRequest: INecessitySearchRequest = {
      skills: skills || undefined,
      searchTerm: searchTerm || undefined,
      startDate: startDateRange && {
        min: startDateRange.start || undefined,
        max: startDateRange.end || undefined
      } || undefined,
      endDate: endDateRange && {
        min: endDateRange.start || undefined,
        max: endDateRange.end || undefined
      } || undefined
    };

    this.search.emit(searchRequest);
    this.filtersPanel?.close();
  }
}
