import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { IPostulation } from 'src/app/modules/core/interfaces';
import { AuthService } from 'src/app/modules/core/services/auth.service';

@Component({
  selector: 'app-necessity-postulation-card',
  templateUrl: './necessity-postulation-card.component.html',
  styleUrls: ['./necessity-postulation-card.component.scss']
})
export class NecessityPostulationCardComponent implements OnInit {

  @Input() postulation!: IPostulation;
  @Input() isRunningUserNecessity: boolean = false;

  @Output() postulationDelete = new EventEmitter<IPostulation>();
  @Output() postulationStatusUpdate = new EventEmitter<IPostulation>();

  get isRunningUser(): boolean {
    return this.postulation.userId === this.authService.runningUser?.id;
  }

  get necessityDescription(): string {
    const necessityDescription = this.postulation.necessity?.description?.replace(/\n/g, '<br>') || '';

    if (necessityDescription.length > 100) {
      return `${necessityDescription.substring(0, 100)}...`;
    }

    return necessityDescription;
  }

  get showNecessityOwnerActions(): boolean {
    return this.postulation.status !== 'Aprobada' && this.postulation.status !== 'Rechazada'
  }

  constructor(
    private authService: AuthService,
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
