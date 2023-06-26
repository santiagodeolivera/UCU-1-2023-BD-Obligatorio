import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ISkill, IUser } from 'src/app/modules/core/interfaces';
import { AuthService } from 'src/app/modules/core/services/auth.service';
import { SkillsService } from 'src/app/modules/core/services/skills.service';
import { SnackbarService } from 'src/app/modules/core/services/snackbar.service';
import { UserService } from 'src/app/modules/core/services/user.service';
import { SkillsDropdownComponent } from 'src/app/modules/shared/components/skills-dropdown/skills-dropdown.component';

@Component({
  selector: 'app-post-skill-form',
  templateUrl: './post-skill-form.component.html',
  styleUrls: ['./post-skill-form.component.scss']
})
export class PostSkillFormComponent implements OnInit {

  isLoading: boolean = false;
  postSkillForm = this.fb.group({
    name: new FormControl<string | undefined>(undefined, Validators.required),
    description: [ '', Validators.maxLength(100) ],
  });

  @ViewChild(SkillsDropdownComponent) skillsDropdown?: SkillsDropdownComponent;

  get omittedOptions(): ISkill[] {
    return this.runningUser.skills || [];
  }

  get runningUser(): IUser {
    return this.authService.runningUser!;
  }

  constructor(
    private fb: FormBuilder,
    private router : Router,
    private authService: AuthService,
    private userService: UserService,
    private skillsService: SkillsService,
    private snackbarService: SnackbarService
  ) { }

  ngOnInit(): void {
    this.updateRunnningUserSkills();
  }

  handleSubmit() {
    if (!this.postSkillForm.valid) return;

    const value = this.postSkillForm.value;

    const skill: ISkill = {
      name: value.name!,
      description: value.description || undefined
    };

    this.skillsService.createUserSkills(this.authService.runningUser?.id!, skill)
    .subscribe(result => {
      if (result.success) {
        this.postSkillForm.setValue({ name: '', description: '' });
        this.snackbarService.openSnackBar(
          'Tu habilidad ha sido cargada exitósamente',
          undefined, 2000
        );
        this.updateRunnningUserSkills();
        return;
      }

      this.snackbarService.openSnackBar(
        'Ha ocurrido un error al cargar tu habilidad. Intenta de nuevo más tarde.',
        'Aceptar'
      );
    });
  }

  updateRunnningUserSkills() {
    this.isLoading = true;
    this.userService.setUserSkills(this.authService.runningUser!)
    .subscribe({
      next: (result) => {
        this.authService.runningUser = result;
        this.skillsDropdown?.filterOptions();
      },
      error: (err) => this.snackbarService.openSnackBar(
        'Ha ocurrido un error actualizando la información de tu usuario. Por favor refresca la página.',
        undefined, 2000),
      complete: () => this.isLoading = false
    });
  }

  handleCancel() {
    return this.router.navigate(['/']);
  }
}
