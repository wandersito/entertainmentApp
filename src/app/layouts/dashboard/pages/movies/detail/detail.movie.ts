import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AllMediasService } from '../../../../../core/services/all-medias.service';
import { MediaType } from '../../../../../core/interfaces/trending-response.interface';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.movie.html',
  styleUrls: ['./detail.movie.css']
})
export class DetailMovie implements OnInit {

  id!: string;
  mediaType: MediaType = MediaType.Movie;

  constructor( private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

    const { id } = this.activatedRoute.snapshot.params;
    this.id = id;

  }

}
