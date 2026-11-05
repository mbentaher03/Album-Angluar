import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Artist } from '../model/artist.model';
import { Album as AlbumService } from '../services/album';
import { UpdateArtist } from '../update-artist/update-artist';

@Component({
  selector: 'app-liste-artists',
  standalone: true,
  imports: [CommonModule, UpdateArtist],
  templateUrl: './liste-artists.html',
})
export class ListeArtistsComponent implements OnInit {
  artists: Artist[] = [];
  updatedArtist: Artist = { idArtist: 0, nomArtist: '' };
  ajout = true;

  constructor(private albumService: AlbumService) {}

  ngOnInit(): void {
    this.chargerArtists();
  }

  chargerArtists(): void {
    this.albumService.listeArtist().subscribe((response) => {
      console.log(response);
      this.artists = response._embedded.artists;
    });
  }

  artistUpdated(artist: Artist): void {
    console.log('Artist updated event', artist);
    this.albumService.ajouterArtist(artist).subscribe(() => this.chargerArtists());
  }

  updateArtist(artist: Artist): void {
    this.updatedArtist = artist;
    this.ajout = false;
  }
}
