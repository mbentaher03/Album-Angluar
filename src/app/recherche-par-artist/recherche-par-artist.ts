import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OnInit } from '@angular/core';
import { Album } from '../model/album.model';
import { Artist } from '../model/artist.model';
import { AlbumService as AlbumService } from '../services/album';

@Component({
  selector: 'app-recherche-par-artist',
  imports: [CommonModule, FormsModule],
  templateUrl: './recherche-par-artist.html',
  styles: ``,
})
export class RechercheParArtist implements OnInit {
  albums: Album[] = [];
  artists: Artist[] = [];
  idArtist!: number;

  constructor(private albumService: AlbumService) {}

  ngOnInit(): void {
    this.albumService.listeArtist().subscribe({
      next: (response) => {
        this.artists = response;
        console.log(response);
      },
      error: (err) => {
        console.error('Erreur chargement artists', err);
      }
    });
  }

  onChange(): void {
    this.albumService.rechercherParArtist(this.idArtist).subscribe((albums) => {
      this.albums = albums;
    });
  }
}
