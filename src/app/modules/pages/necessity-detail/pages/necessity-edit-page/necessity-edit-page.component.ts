import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { INecessity } from 'src/app/modules/core/interfaces';
import { NecessityService } from 'src/app/modules/core/services/necessity.service';

@Component({
  selector: 'app-necessity-edit-page',
  templateUrl: './necessity-edit-page.component.html',
  styleUrls: ['./necessity-edit-page.component.scss']
})
export class NecessityEditPageComponent implements OnInit {

  isLoading: boolean = false;
  necessity?: INecessity;

  constructor(
    private necessityService: NecessityService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  getNecessity() {
    this.isLoading = true;

    const necessityId = this.route.snapshot.paramMap.get('id') || '';
    this.necessityService.getNecessityById(necessityId)
    .subscribe(result => {
      this.isLoading = false;

      if (result.success) {
        this.necessity = result.data;
        return;
      }

      this.router.navigate(['']);
    });
  }

}
