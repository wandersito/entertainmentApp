import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { HomeComponent } from './pages/shared/home/home.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: 'home', component: HomeComponent },
      // { path: 'movie/:id', component: MovieComponent },
      // { path: 'movies', component: MoviesComponent },
      // { path: 'movies/genres/:genre/:name', component: MoviesComponent },
      // { path: 'trending', component: TrendingComponent },
      // { path: 'tv-shows', component: TvShowsComponent},
      // { path: 'tv-show/:id', component: TvShowComponent},
      // { path: 'tv-shows/genres/:genre/:name', component: TvShowsComponent},
      { path: '**', redirectTo: 'home' },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
