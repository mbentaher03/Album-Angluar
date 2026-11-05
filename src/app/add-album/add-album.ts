import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Album } from '../model/album.model';
import { Album as AlbumService } from '../services/album';
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
    // this.artists = this.albumService.listeArtist(); 
    this.albumService.listeArtist().subscribe((response) => {
      console.log(response);
      this.artists = response._embedded.artists;
    });
  }

  addAlbum(): void {
    //this.newArtist = this.albumService.consulterArtist(this.newIdArt);
    this.newArtist = this.artists.find((artist) => artist.idArtist == this.newIdArt)!;
    this.newAlbum.artist = this.newArtist;
    this.newAlbum.DateAlbum = new Date(`${this.dateAlbum}T00:00:00`);
    this.albumService.ajouterAlbum(this.newAlbum).subscribe((album) => {
      console.log(album);
      this.router.navigate(['/album']);
      this.newAlbum = {};
      this.dateAlbum = '';
    });
  }

}
