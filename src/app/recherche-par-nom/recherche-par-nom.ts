import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Album } from '../model/album.model';
import { Album as AlbumService } from '../services/album';
import { SearchFilterPipe } from './search-filter.pipe';

@Component({
  selector: 'app-recherche-par-nom',
  standalone: true,
  imports: [CommonModule, FormsModule, SearchFilterPipe],
  templateUrl: './recherche-par-nom.html',
})
export class RechercheParNom implements OnInit {
  albums: Album[] = [];
  searchTerm = '';

  constructor(private albumService: AlbumService) {}

  ngOnInit(): void {
    this.albumService.listeAlbums().subscribe((albums) => {
      console.log(albums);
      this.albums = albums;
    });
  }
}
