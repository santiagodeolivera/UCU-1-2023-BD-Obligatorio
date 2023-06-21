import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ProfileUpdateService } from 'src/app/modules/core/services/profile-update.service';
import { User } from 'src/app/modules/core/interfaces/user';
import { ProfileUpdateFormComponent } from '../../component/profile-update-form/profile-update-form.component';

@Component({
  selector: 'app-profile-update',
  templateUrl: './profile-update.component.html',
  styleUrls: ['./profile-update.component.scss']
})
export class ProfileUpdateComponent implements OnInit {
  public user?: User;
  @ViewChild('profileUpdateForm')
  formData!: ProfileUpdateFormComponent;

  @Output() cancel = new EventEmitter<void>();
  @Output() save = new EventEmitter<User>();
 
  constructor(private fb : FormBuilder,
    private router: Router,
    private profileUpdateService : ProfileUpdateService) { }
  
  ngOnInit(): void {
    
  }
  
  pullFormData(){
    const user = this.formData.profileUpdateForm.value as User;
    return user;
  }

  onSubmit(){
    const user = this.pullFormData();
    this.profileUpdateService.updateUser(user).subscribe( (res) => {
      if (res.success) {
        this.router.navigate(['/home']);
        return;
      }
    });
  }

  async getUserProfile (ci: string){
    this.profileUpdateService.getUserProfile(ci)
      .subscribe(user => this.user = user);
  }

  handleSubmit() {
    if (!this.formData.profileUpdateForm.valid) return;

    const value = this.formData.profileUpdateForm.value;
    const user: User = {
      ci: this.user?.ci,
      name: value.name || undefined,
      surname: value.surname || undefined,
      urlPictureID: value.urlPictureID || undefined,
      isAdmin: value.isAdmin || undefined,
      hashPassword: value.hashPassword || undefined,
      email: value.email || undefined,
      phone: value.phone || undefined,
      geoDistance: value.geoDistance || undefined,
      geoState: value.geoState || undefined,
      location: value.location || undefined,
    };

    this.save.emit(user);
  }

  handleCancel() {
    this.cancel.emit();
  }
  
}
