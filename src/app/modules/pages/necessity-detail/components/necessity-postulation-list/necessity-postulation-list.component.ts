import { Component, OnInit, Input } from '@angular/core';
import { INecessity, IPostulation } from 'src/app/modules/core/interfaces';
import { PostulationService } from 'src/app/modules/core/services/postulation.service';
import { SnackbarService } from 'src/app/modules/core/services/snackbar.service';

@Component({
  selector: 'app-necessity-postulation-list',
  templateUrl: './necessity-postulation-list.component.html',
  styleUrls: ['./necessity-postulation-list.component.scss']
})
export class NecessityPostulationListComponent implements OnInit {

  postulations: IPostulation[] = [];
  isLoading: boolean = false;

  @Input() necessity?: INecessity;
  @Input() isRunningUserNecessity: boolean = false;

  constructor(
    private postulationService: PostulationService,
    private snackbarService: SnackbarService
  ) { }

  ngOnInit(): void {
    this.getPostulations();
  }

  getPostulations() {
    this.isLoading = true;
    console.log('test');
    this.postulationService.getPostulationsFromNecessity(this.necessity!.id!)
    .subscribe(result => {
      console.log(result);
      this.isLoading = false;

      if (result.success) {
        this.postulations = result.data!;
        return;
      }

      this.snackbarService.openSnackBar(
        'Hubo un error al recuperar las postulaciones para esta necesidad. Por favor refresca la página o intenta nuevamente más tarde.',
        'Aceptar'
      );
    });
  }

}
