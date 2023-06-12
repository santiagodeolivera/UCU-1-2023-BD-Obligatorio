import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { INecessity } from 'src/app/modules/core/interfaces';
import { NecessityService } from 'src/app/modules/core/services/necessity.service';

@Component({
  selector: 'app-edit-necessity-form',
  templateUrl: './edit-necessity-form.component.html',
  styleUrls: ['./edit-necessity-form.component.scss']
})
export class EditNecessityFormComponent implements OnInit {
  isLoading: boolean = false;

  @Input() necessity!: INecessity;

  constructor(
    private router: Router,
    private necessityService: NecessityService
  ) { }

  ngOnInit(): void {
  }

  handleCancel() {
    this.router.navigate([`/necessities/${this.necessity.id}`]);
  }

  handleSave($event: INecessity) {

  }
}
