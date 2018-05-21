import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatInputModule,
  MatProgressSpinnerModule,
  MatButtonModule,
  MatCardModule,
  MatIconModule,
  MatDialogModule,
  MatCheckboxModule
 } from '@angular/material';

import { AppComponent } from './app.component';
import { HomePageComponent } from './views/home-page/home-page.component';
import { CatCardComponent } from './components/cat-card/cat-card.component';
import { CatsService } from './services/cats.service';
import { FavoritesPageComponent } from './views/favorites-page/favorites-page.component';
import { CatDialogComponent } from './components/cat-dialog/cat-dialog.component';



// Routing settings
const routes = [
  { path: '', component: HomePageComponent },
  { path: 'favorites', component: FavoritesPageComponent },
  { path: '**', redirectTo: '/'}
];

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    CatCardComponent,
    FavoritesPageComponent,
    CatDialogComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    MatInputModule, MatProgressSpinnerModule, MatButtonModule, MatCardModule, MatIconModule, MatCheckboxModule, MatDialogModule

  ],
  providers: [
    CatsService,
  ],
  entryComponents: [CatDialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
