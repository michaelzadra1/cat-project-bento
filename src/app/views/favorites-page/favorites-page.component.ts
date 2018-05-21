import { Component, OnInit } from '@angular/core';
import { Cat } from '../../models/Cat';

@Component({
  selector: 'app-favorites-page',
  templateUrl: './favorites-page.component.html',
})
export class FavoritesPageComponent implements OnInit {
  favoriteCats: Object;
  cats: Cat[];
  constructor() { }

  ngOnInit() {
    // Load favorited cats from local storage
    this.favoriteCats = JSON.parse(localStorage.getItem("favoritedCats") || "{}");
    this.cats = Object.values(this.favoriteCats);
  }
  addCat(cat: Cat): void {
    this.favoriteCats[cat.id] = cat; // add cat to favorites
    localStorage.setItem("favoritedCats", JSON.stringify(this.favoriteCats));
  }
  removeCat(cat: Cat): void {
    delete this.favoriteCats[cat.id]; // remove cat from favorites
    localStorage.setItem("favoritedCats", JSON.stringify(this.favoriteCats));
  }

}
