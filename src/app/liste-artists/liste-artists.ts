import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Artist } from '../model/artist.model';
import { AlbumService as AlbumService } from '../services/album';
import { UpdateArtist } from '../update-artist/update-artist';

@Component({
  selector: 'app-liste-artists',
  standalone: true,
  imports: [CommonModule, UpdateArtist],
  templateUrl: './liste-artists.html',
})
export class ListeArtistsComponent implements OnInit {
  artists: Artist[] = [];
  updatedArtist: Artist = { idArtist: 0, nomArtiste: '' };
  ajout = true;

  constructor(private albumService: AlbumService) {}

  ngOnInit(): void {
    this.chargerArtists();
  }

  chargerArtists(): void {
    this.albumService.listeArtist().subscribe({
      next: (response) => {
        console.log(response);
        this.artists = response;
      },
      error: (err) => {
        console.error('Erreur chargement artists (403?)', err);
      }
    });
  }

 artistUpdated(artist: Artist): void {
  const newArtist = { nomArtiste: artist.nomArtiste } as Artist;

  this.albumService.ajouterArtist(newArtist).subscribe({
    next: () => {
      this.updatedArtist = { idArtist: 0, nomArtiste: '' }; // reset the form
      this.chargerArtists();
    },
    error: (err) => console.error('Add artist failed', err),
  });
}

  updateArtist(artist: Artist): void {
    this.updatedArtist = artist;
    this.ajout = false;
  }
}
