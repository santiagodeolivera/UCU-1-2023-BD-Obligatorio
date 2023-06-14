import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { IPostulation } from 'src/app/modules/core/interfaces';
import { UserService } from 'src/app/modules/core/services/user.service';

@Component({
  selector: 'app-postulation-card',
  templateUrl: './postulation-card.component.html',
  styleUrls: ['./postulation-card.component.scss']
})
export class PostulationCardComponent implements OnInit {

  @Input() postulation!: IPostulation;
  @Input() isRunningUserNecessity: boolean = false;

  @Output() postulationDelete = new EventEmitter<IPostulation>();
  @Output() postulationStatusUpdate = new EventEmitter<IPostulation>();

  get isRunningUser(): boolean {
    return this.postulation.userId === this.userService.runningUser?.id;
  }

  get showNecessityOwnerActions(): boolean {
    return this.postulation.status !== 'Aprobada' && this.postulation.status !== 'Rechazada'
  }

  constructor(
    private userService: UserService,
  ) { }

  ngOnInit(): void {
  }

  handlePostulationDelete() {
    this.postulationDelete.emit(this.postulation);
  }

  updatePostulationStatus(status: 'Aprobada' | 'Rechazada') {
    if (this.isRunningUser) return;
    const postulation = {
      ...this.postulation,
      status
    };

    this.postulationStatusUpdate.emit(postulation);
  }

}
