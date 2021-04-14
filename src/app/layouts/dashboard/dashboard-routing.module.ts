import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { HomeComponent } from './pages/shared/home/home.component';
import { DetailMovie } from './pages/movies/detail/detail.movie';
import { ListMovie } from './pages/movies/list/list.movie';
import { ListTvShow } from './pages/tv-shows/list/list.tv-show';
import { DetailTvShow } from './pages/tv-shows/detail/detail.tv-show';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'movie/:id', component: DetailMovie },
      { path: 'movies', component: ListMovie },
      { path: 'movies/genres/:genre/:name', component: ListMovie },
      // { path: 'trending', component: TrendingComponent },
      { path: 'tv-show/:id', component: DetailTvShow},
      { path: 'tv-shows', component: ListTvShow},
      { path: 'tv-shows/genres/:genre/:name', component: ListTvShow},
      { path: '**', redirectTo: 'home' },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
