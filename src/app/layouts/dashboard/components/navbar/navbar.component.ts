import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { combineLatest, Subject } from 'rxjs';
import { Genre } from 'src/app/core/interfaces/genre.interface';
import { MenuItem } from 'src/app/core/interfaces/menu.interface';
import { AllMediasService } from '../../../../core/services/all-medias.service';
import { Router } from '@angular/router';
import { debounceTime, switchMap } from 'rxjs/operators';
import { Result, MediaType } from '../../../../core/interfaces/trending-response.interface';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  value: string = '';

  myForm: FormGroup = this.fb.group({
    search: ['']
  })

  debouncer: Subject<string> = new Subject();

  moviesGenres:Genre[] = [];
  tvShowsGenres:Genre[] = [];

  suggestedMedia:Result[] = [];

  menu:MenuItem[] = [
    {
      label: 'Home',
      url: './home'
    },
    {
      label: 'About',
      url: './about'
    }
];

  constructor( private allMediasServices: AllMediasService,
              private fb: FormBuilder,
              private router: Router ) { }

  ngOnInit(): void {

    this.debouncer
      .pipe(
        debounceTime( 300 ),
        switchMap( value => this.allMediasServices.getMediaBySearch( value ) )
      )
      .subscribe( mediaItems => {
        this.suggestedMedia = mediaItems.splice(0,5);
    })

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
        url: 'tv-shows'
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

  searchContent(){
    this.value = this.myForm.get('search')?.value;
    this.value.trim();

    this.allMediasServices.reset();
    this.router.navigate(['/dashboard/search', this.value]);
    this.myForm.reset();
  }

  suggest(){
    this.suggestedMedia = [];
    this.value = this.myForm.get('search')?.value;
    this.debouncer.next( this.value )
    this.allMediasServices.reset();
  }

  moveToDetail( media: Result ){
    console.log(media.media_type, media.id);
    this.suggestedMedia = [];
    this.myForm.reset();
    this.router.navigate([`/dashboard/${media.media_type}`, media.id]);
  }

}
