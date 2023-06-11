import { Component, Input, OnInit, ViewChild } from '@angular/core';
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
  
}
