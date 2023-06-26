import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ISkill, IUserSkill, IUser } from 'src/app/modules/core/interfaces';
import { AuthService } from 'src/app/modules/core/services/auth.service';
import { SkillsService } from 'src/app/modules/core/services/skills.service';

@Component({
  selector: 'app-post-skill-form',
  templateUrl: './post-skill-form.component.html',
  styleUrls: ['./post-skill-form.component.scss']
})
export class PostSkillFormComponent implements OnInit {
  creationDate: Date = new Date();
  @Input() user!: IUser;
  @Input() skill?: IUserSkill;
  @Output() cancel = new EventEmitter<void>();
  @Output() save = new EventEmitter<IUserSkill>();
  skills?  : ISkill[];
  postSkillForm = this.fb.group({
    userId : [ '', Validators.required ],
    // Se permite seleccionar solo una skill de la lista de skills por su nombre
    name : new FormControl<string | undefined>(undefined, Validators.required),
    description : [ '', Validators.required, Validators.maxLength(500) ],
    creationDate: new FormControl<Date | undefined>(undefined, Validators.required),
  });

  constructor(
    private fb: FormBuilder,
    private router : Router,
    private authService: AuthService,
    private skillService: SkillsService
  ) { }

  get runningUser(): IUser {
    return this.authService.runningUser!;
  }

  ngOnInit(): void {
    this.getSkills();
  }

  getSkills() {
    this.skillService.getAllSkills()
    .subscribe(result => {
      if (result.success) {
        this.skills = result.data!;
        return;
      }
    })
  }

  ngAfterViewInit(): void {
    if (this.skill) this.prepopulateForm();
  }

  prepopulateForm() {
    this.postSkillForm.setValue({
      userId: this.authService.runningUser?.id || null,
      name: this.skill?.name || null,
      description: this.skill?.description || null,
      creationDate: this.skill?.creationDate || null,
    });
  }

  handleSubmit() {
    if (!this.postSkillForm.valid) return;

    const value = this.postSkillForm.value;
    const name: string = this.skill?.name || '';

    
    const skill: IUserSkill = {
      userId: value.userId || undefined,
      name: value.name || undefined,
      description: value.description || undefined,
      creationDate: value.creationDate || undefined,
    };

    this.save.emit(skill);
  }

  handleCancel() {
    this.cancel.emit();
    return this.router.navigate(['/']);
  }

}
