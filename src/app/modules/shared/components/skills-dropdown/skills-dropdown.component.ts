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

  @Input() label: string = 'Habilidades';
  @Input() control!: FormControl<string[] | null | undefined>;

  get selectedSkillsString(): string {
    const optionNamesById: Map<string, string> = new Map<string, string>();
    this.options.forEach(opt => optionNamesById.set(opt.name, opt.name));

    let skillString = '';
    this.control.value?.forEach((value, i) => {
      if (i === 0) {
        skillString = `${optionNamesById.get(value)}`;
      } else {
        skillString = `${skillString}, ${optionNamesById.get(value)}`;
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
        return;
      }

      this.snackbarService.openSnackBar(
        'Hubo un error cargando habilidades. Por favor refresca la página o intenta de nuevo más tarde.',
        'Aceptar'
      );
    })
  }

}
