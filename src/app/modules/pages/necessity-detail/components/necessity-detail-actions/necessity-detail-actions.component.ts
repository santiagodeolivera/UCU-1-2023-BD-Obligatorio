import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { INecessity, IPostulation } from 'src/app/modules/core/interfaces';
import { UserService } from 'src/app/modules/core/services/user.service';

@Component({
  selector: 'app-necessity-detail-actions',
  templateUrl: './necessity-detail-actions.component.html',
  styleUrls: ['./necessity-detail-actions.component.scss']
})
export class NecessityDetailActionsComponent implements OnInit {
  isEditMode: boolean = false;

  @Input() necessity!: INecessity;

  @Output() newPostulation = new EventEmitter<IPostulation>();
  @Output() editToggle = new EventEmitter<boolean>();

  get runningUserId(): string | undefined {
    return this.userService.runningUser?.id;
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

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
  }

  handleNewPostulation() {
    if (this.isByRunningUser || this.hasPostulation) return;

    const postulation: IPostulation = {
      necessityId: this.necessity.id,
      userId: this.userService.runningUser?.id
    };

    this.newPostulation.emit(postulation);
  }

  handleEditStart() {
    this.isEditMode = true;
    this.editToggle.emit(this.isEditMode);
  }
}
