import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Album } from '../model/album.model';
import { Album as AlbumService } from '../services/album';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-albums',
  imports: [CommonModule, RouterLink],
  templateUrl: './albums.html',
  styleUrl: './albums.css',
})
export class Albums implements OnInit {
  albums: Album[] = [];

  constructor(
    private albumService: AlbumService,
    public authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.chargerAlbums();
  }

  chargerAlbums(): void {
    this.albumService.listeAlbums().subscribe((albums) => {
      console.log(albums);
      this.albums = albums;
    });
  }

  
  supprimerAlbum(album: Album): void {
    const confirmation = confirm('Êtes-vous sûr ?');
    if (confirmation && album.idAlbum !== undefined) {
      this.albumService.supprimerAlbum(album.idAlbum).subscribe(() => {
        console.log('Album supprimé');
        this.chargerAlbums();
      });
    }
  }
}


