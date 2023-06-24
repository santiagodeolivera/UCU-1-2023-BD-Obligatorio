import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { INecessity, IPostulation } from 'src/app/modules/core/interfaces';
import { AuthService } from 'src/app/modules/core/services/auth.service';

@Component({
  selector: 'app-necessity-detail-actions',
  templateUrl: './necessity-detail-actions.component.html',
  styleUrls: ['./necessity-detail-actions.component.scss']
})
export class NecessityDetailActionsComponent implements OnInit {
  today = new Date();

  @Input() necessity!: INecessity;

  @Output() newPostulation = new EventEmitter<IPostulation>();
  @Output() startEdit = new EventEmitter<void>();
  @Output() delete = new EventEmitter<void>();
  @Output() solve = new EventEmitter<void>();

  get runningUserId(): string | undefined {
    return this.authService.runningUser?.id;
  }

  get isByRunningUser(): boolean {
    return this.necessity.userId === this.runningUserId;
  }

  get hasPostulation(): boolean {
    const postulation = this.necessity.postulations?.find(
      pos => pos.userId === this.runningUserId
    );

    return this.isByRunningUser && postulation !== undefined;
  }

  get isSolved(): boolean {
    return this.necessity.status === 'Solucionada';
  }

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  handleNewPostulation() {
    if (this.isByRunningUser || this.hasPostulation) return;

    const postulation: IPostulation = {
      necessityId: this.necessity.id,
      userId: this.authService.runningUser?.id
    };

    this.newPostulation.emit(postulation);
  }

  handleEditStart() {
    this.startEdit.emit();
  }

  handleDelete() {
    this.delete.emit();
  }

  handleSolve() {
    this.solve.emit();
  }
}
