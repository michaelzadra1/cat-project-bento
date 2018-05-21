import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Cat } from '../../models/Cat';
import { MatDialog, MatDialogRef } from "@angular/material";
import { CatDialogComponent } from "../cat-dialog/cat-dialog.component";


@Component({
  selector: 'app-cat-card',
  templateUrl: './cat-card.component.html',
})
export class CatCardComponent {
  @Input() cat: Cat;

  @Output() addFavorite: EventEmitter<any> = new EventEmitter();
  @Output() removeFavorite: EventEmitter<any> = new EventEmitter();

  catDialogRef: MatDialogRef<CatDialogComponent>;

  constructor(
    private dialog: MatDialog
  ) { }

  toggle(): void {
    this.cat.favorite = !this.cat.favorite;
    if (this.cat.favorite === true) {
      this.addFavorite.emit(this.cat);
    } else {
      this.removeFavorite.emit(this.cat);
    }
  }
  viewCat(cat: Cat): void {
    this.catDialogRef = this.dialog.open(CatDialogComponent, {
      width: "800px",
      maxHeight: "700px",
      data: this.cat
    });
  }
}
