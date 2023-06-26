import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ISkill } from 'src/app/modules/core/interfaces';
import { SkillsService } from 'src/app/modules/core/services/skills.service';
import { SnackbarService } from 'src/app/modules/core/services/snackbar.service';

@Component({
  selector: 'app-skills-dropdown',
  templateUrl: './skills-dropdown.component.html',
  styleUrls: ['./skills-dropdown.component.scss']
})
export class SkillsDropdownComponent implements OnInit {

  options: ISkill[] = [];
  skills?: ISkill[];

  @Input() label: string = 'Habilidades';
  @Input() control!: FormControl<string[] | string | null | undefined>;
  @Input() omittedOptions: ISkill[] = [];
  @Input() isMultiple: boolean = false;

  get selectedSkillsString(): string {
    if (typeof this.control.value === 'string') {
      return this.control.value;
    }

    let skillString = '';
    this.control.value?.forEach((value, i) => {
      if (i === 0) {
        skillString = `${value}`;
      } else {
        skillString = `${skillString}, ${value}`;
      }
    });

    return skillString;
  }

  constructor(
    private skillService: SkillsService,
    private snackbarService: SnackbarService
  ) { }

  ngOnInit(): void {
    this.getOptions();
  }

  getOptions() {
    this.skillService.getAllSkills()
    .subscribe(result => {
      if (result.success) {
        this.options = result.data!;

        if (this.omittedOptions && this.omittedOptions.length) this.filterOptions();

        return;
      }

      this.snackbarService.openSnackBar(
        'Hubo un error cargando habilidades. Por favor refresca la página o intenta de nuevo más tarde.',
        'Aceptar'
      );
    })
  }

  filterOptions() {
    const finalOptions: ISkill[] = [];
    const omittedOptionsSet = new Set<string>();

    this.omittedOptions.forEach(opt => {
      omittedOptionsSet.add(opt.name);
    });

    this.options.forEach(opt => {
      if (omittedOptionsSet.has(opt.name)) return;

      finalOptions.push(opt);
    });

    this.options = finalOptions;
  }

}
