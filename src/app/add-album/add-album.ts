import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Album } from '../model/album.model';
import { AlbumService as AlbumService } from '../services/album';
import { Artist } from '../model/artist.model'; 

@Component({
  selector: 'app-add-album',
  imports: [FormsModule],
  templateUrl: './add-album.html',
})
export class AddAlbum implements OnInit {
  newAlbum: Album = {};
  dateAlbum = '';
  artists! : Artist[]; 
  newIdArt! : number; 
  newArtist! : Artist; 

  constructor(
    private albumService: AlbumService,
    private router: Router,
  ) {}

  ngOnInit(): void {
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

  addAlbum(): void {
    this.newArtist = this.artists.find((artist) => artist.idArtist == this.newIdArt)!;
    this.newAlbum.artist = this.newArtist;
    this.newAlbum.dateSortie = new Date(`${this.dateAlbum}T00:00:00`);
    this.albumService.ajouterAlbum(this.newAlbum).subscribe((album) => {
      console.log(album);
      this.router.navigate(['/album']);
      this.newAlbum = {};
      this.dateAlbum = '';
    });
  }

}
