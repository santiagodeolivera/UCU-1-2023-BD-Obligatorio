import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ISkill } from 'src/app/modules/core/interfaces';

@Component({
  selector: 'app-skill-dialog',
  templateUrl: './skill-dialog.component.html',
  styleUrls: ['./skill-dialog.component.scss']
})
export class SkillDialogComponent implements OnInit {

  get skillDescription(): string {
    return this.data.description || 'No se han proveído detalles para esta habilidad.';
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ISkill,
    private dialogRef: MatDialogRef<SkillDialogComponent>
  ) { }

  ngOnInit(): void { }

  handleClose() {
    this.dialogRef.close();
  }
}
