import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Album as AlbumModel } from '../model/album.model';
import { Artist } from '../model/artist.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class Album {
  readonly apiURL = 'http://localhost:8080/albums/api';
  artists : Artist[];
  private albums: AlbumModel[];
  album!: AlbumModel;

  constructor(private http: HttpClient) {
   this.artists = [ {idArtist : 1, nomArtist : "Charli XcX"}, 
                        {idArtist : 2, nomArtist : "Lady Gaga"}];  

    this.albums = [
      { idAlbum: 1, titreAlbum: 'BRAT', genreMusical: 'Pop', DateAlbum: new Date('2026-01-14') },
      { idAlbum: 2, titreAlbum: 'Pop 2', genreMusical: 'Pop', DateAlbum: new Date('2027-07-14') },
      { idAlbum: 3, titreAlbum: 'CRASH', genreMusical: 'Pop', DateAlbum: new Date('2022-02-03') },
    ];
  }

  listeAlbums(): Observable<AlbumModel[]> {
    return this.http.get<AlbumModel[]>(this.apiURL);
  }

  consulterAlbum(id: number): AlbumModel {
    this.album = this.albums.find((album) => album.idAlbum === id)!;
    return this.album;
  }

  ajouterAlbum(album: AlbumModel): void {
    this.albums.push(album);
  }

  supprimerAlbum(album: AlbumModel): void {
    const index = this.albums.indexOf(album);
    if (index > -1) {
      this.albums.splice(index, 1);
    }
  }

  modifierAlbum(album: AlbumModel): void {
    const index = this.albums.indexOf(album, 0);
    if (index > -1) {
      this.albums.splice(index, 1);
      this.albums.splice(index, 0, album);
    }
  }
  listeArtist():Artist[] { 
      return this.artists; 
    } 
   consulterArtist(id:number): Artist{     
          return this.artists.find(art => art.idArtist  == id)!; 
           }  
}
