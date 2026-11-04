import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Album } from '../model/album.model';
import { Album as AlbumService } from '../services/album';

@Component({
  selector: 'app-albums',
  imports: [CommonModule, RouterLink],
  templateUrl: './albums.html',
  styleUrl: './albums.css',
})
export class Albums implements OnInit {
  albums: Album[] = [];

  constructor(private albumService: AlbumService) {}

  ngOnInit(): void {
    this.albumService.listeAlbums().subscribe((albums) => {
      this.albums = albums;
    });
  }

  
  supprimerAlbum(album: Album): void {
    const confirmation = confirm('Êtes-vous sûr ?');
    if (confirmation) {
      this.albumService.supprimerAlbum(album);
    }
  }
}


