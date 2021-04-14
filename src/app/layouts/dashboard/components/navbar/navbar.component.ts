import { Component, OnInit } from '@angular/core';
import { combineLatest } from 'rxjs';
import { Genre } from 'src/app/core/interfaces/genre.interface';
import { MenuItem } from 'src/app/core/interfaces/menu.interface';
import { AllMediasService } from '../../../../core/services/all-medias.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  moviesGenres:Genre[] = [];
  tvShowsGenres:Genre[] = [];

  menu:MenuItem[] = [
    {
      label: 'Home',
      url: './home'
    },
    {
      label: 'Popular',
      url: './trending'
    }
];

  constructor( private allMediasServices: AllMediasService ) { }

  ngOnInit(): void {

    combineLatest( [
      this.allMediasServices.getGenresByMedia('movie'),
      this.allMediasServices.getGenresByMedia('tv')
    ]).subscribe( ( [movies, tvShows] ) => {
      this.moviesGenres = movies;
      this.tvShowsGenres = tvShows;

      let subMenu = this.createMenu( this.moviesGenres );
      this.insertIntoMenu( subMenu, 1, {
        label: 'Movies',
        url: 'movies'
      });
      subMenu = this.createMenu( this.tvShowsGenres );
      this.insertIntoMenu( subMenu, 2,  {
        label: 'TV Shows',
        url: './tv-shows'
      });

    });

  }

  createMenu( genres: Genre[] ){

    const submenu: MenuItem[] = [];

    genres.forEach(genre => {
      submenu.push({
        label: genre.name,
        url: `/${genre.id}`
      })
    });

    return submenu;

  }

  insertIntoMenu( submenu: MenuItem[], position: number, { label, url }:MenuItem ){
    this.menu.splice(position,0,{
      label: label,
      url: url,
      menu: submenu
    })
  }

}
