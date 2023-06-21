import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';

import { INecessitySearchRequest, ISkill } from 'src/app/modules/core/interfaces';

@Component({
  selector: 'app-necessity-search-form',
  templateUrl: './necessity-search-form.component.html',
  styleUrls: ['./necessity-search-form.component.scss']
})
export class NecessitySearchFormComponent implements OnInit {

  skillOptions: ISkill[] = [];
  necessitySearchForm = this.fb.group({
    searchTerm: new FormControl<string | undefined>(undefined),
    skills: new FormControl<string[] | undefined>(undefined),
    minStartDate: new FormControl<Date | undefined>(undefined),
    maxStartDate: new FormControl<Date | undefined>(undefined),
    minEndDate: new FormControl<Date | undefined>(undefined),
    maxEndDate: new FormControl<Date | undefined>(undefined)
  });

  @Output() search = new EventEmitter<INecessitySearchRequest>();

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.getSkillOptions();
  }

  getSkillOptions() {
    // TODO: Get all skills for options.
  }

  handleSubmit() {
    const { skills, searchTerm, minStartDate, maxStartDate, minEndDate, maxEndDate } = this.necessitySearchForm.value;

    const searchRequest: INecessitySearchRequest = {
      skills: skills || undefined,
      searchTerm: searchTerm || undefined,
      startDate: (minStartDate || maxStartDate) && {
        min: minStartDate || undefined,
        max: maxStartDate || undefined
      } || undefined,
      endDate: (minEndDate || maxEndDate) && {
        min: minEndDate || undefined,
        max: maxEndDate || undefined
      } || undefined
    };

    this.search.emit(searchRequest);
  }
}
