import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { Cat } from '../../models/Cat';

@Component({
  selector: 'app-cat-dialog',
  templateUrl: './cat-dialog.component.html',
})
export class CatDialogComponent implements OnInit {
  cat: Cat;

  constructor(
    public dialogRef: MatDialogRef<CatDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Cat
  ) { }

  ngOnInit() {
    this.cat = this.data;
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

}
