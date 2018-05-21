import { Component, OnInit } from '@angular/core';
import { CatsService } from '../../services/cats.service';
import { Observable } from 'rxjs/Observable';
import { Cat } from '../../models/Cat';
import 'rxjs/add/observable/forkJoin';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
})
export class HomePageComponent implements OnInit {
  loading = false;
  catImages: Object[] = [];
  cats: Cat[] = [];
  favoriteCats: Object;

  constructor(
    private catsService: CatsService
  ) { }

  ngOnInit() {
    this.loading = true;
    this.favoriteCats = JSON.parse(localStorage.getItem("favoritedCats") || "{}");
    Observable.forkJoin(
      this.catsService.getCatImages(),
      this.catsService.getCatFacts()
    ).subscribe(
      (response) => {
        this.catImages = response[0]['response']['data'][0]['images'][0]['image'];
        this.cats = JSON.parse(response[1]['body'])['data'];
      },
      (error) => {
        console.log('error');
      },
      () => {
        // construct cats array
        for (let i in this.catImages) {
          this.cats[i].id = this.catImages[i]['id'][0];
          this.cats[i].source_url = this.catImages[i]['source_url'][0];
          this.cats[i].image_url = this.catImages[i]['url'][0];
          this.cats[i].last_fact_word = this.getLastWord(this.cats[i].fact);
          this.cats[i].favorite = false;
        }
        this.loading = false;
      }
    );
  }

  // gets last word of a cat fact
  getLastWord(fact: string): string {
    let word = fact.split(" ").pop();
    word = word.toLowerCase().replace(/[^0-9a-z]/gi, ''); // lowercase & remove non-alphanumeric
    return word;
  }

  // sorts cats by last word of fact
  toggleSort(e: any): void {
    if (e.checked === true) {
      this.cats.sort(this.compare);
    } else if (e.checked === false) {
      this.cats.reverse();
    }
  }

  addCat(cat: Cat): void {
    this.favoriteCats[cat.id] = cat; // add cat to favorites
    localStorage.setItem("favoritedCats", JSON.stringify(this.favoriteCats));
  }
  removeCat(cat: Cat): void {
    delete this.favoriteCats[cat.id]; // remove cat from favorites
    localStorage.setItem("favoritedCats", JSON.stringify(this.favoriteCats));
  }

  // compare function for sorting last word of facts
  compare(a: Cat, b: Cat): number {
    if (a.last_fact_word < b.last_fact_word) {
      return -1;
    }
    if (a.last_fact_word > b.last_fact_word) {
      return 1;
    }
    return 0;
  }


}
