import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Album as AlbumModel } from '../model/album.model';
import { Artist } from '../model/artist.model';
import { ArtistWrapper } from '../model/artist-wrapper.model';
import { environment } from '../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class Album {
  readonly apiURL = environment.apiURL;
  artists: Artist[];
  private albums: AlbumModel[];
  album!: AlbumModel;

  constructor(private http: HttpClient) {
   /* this.artists = [ {idArtist : 1, nomArtist : "Charli XcX"}, 
                        {idArtist : 2, nomArtist : "Lady Gaga"}];   */
    this.artists = [
      { idArtist: 1, nomArtist: 'Charli XcX' },
      { idArtist: 2, nomArtist: 'Lady Gaga' },
    ];

    this.albums = [
      { idAlbum: 1, titreAlbum: 'BRAT', genreMusical: 'Pop', DateAlbum: new Date('2026-01-14') },
      { idAlbum: 2, titreAlbum: 'Pop 2', genreMusical: 'Pop', DateAlbum: new Date('2027-07-14') },
      { idAlbum: 3, titreAlbum: 'CRASH', genreMusical: 'Pop', DateAlbum: new Date('2022-02-03') },
    ];
  }

  listeAlbums(): Observable<AlbumModel[]> {
    return this.http.get<AlbumModel[]>(this.apiURL);
  }

  rechercherParArtist(idArtist: number): Observable<AlbumModel[]> {
    const url = `${this.apiURL}/albumsartist/${idArtist}`;
    return this.http.get<AlbumModel[]>(url);
  }

  rechercherParNom(titre: string): Observable<AlbumModel[]> {
    const url = `${this.apiURL}/albumsByName/${encodeURIComponent(titre)}`;
    return this.http.get<AlbumModel[]>(url);
  }

  consulterAlbum(id: number): Observable<AlbumModel> {
    const url = `${this.apiURL}/${id}`;
    return this.http.get<AlbumModel>(url);
  }

  ajouterAlbum(album: AlbumModel): Observable<AlbumModel> {
    return this.http.post<AlbumModel>(this.apiURL, album, httpOptions);
  }

  supprimerAlbum(id: number) {
    const url = `${this.apiURL}/${id}`;
    return this.http.delete(url, httpOptions);
  }

  modifierAlbum(album: AlbumModel): Observable<AlbumModel> {
    return this.http.put<AlbumModel>(this.apiURL, album, httpOptions);
  }
  listeArtist(): Observable<ArtistWrapper> {
    return this.http.get<ArtistWrapper>(this.apiURLArtist);
  }

  ajouterArtist(artist: Artist): Observable<Artist> {
    return this.http.post<Artist>(this.apiURLArtist, artist, httpOptions);
  }

  consulterArtist(id: number): Artist {
    return this.artists.find((artist) => artist.idArtist === id)!;
  }

  private get apiURLArtist(): string {
    return this.apiURL.replace(/\/api$/, '/artist');
  }

  /*listeArtist():Artist[] { 
      return this.artists; 
    } 
   consulterArtist(id:number): Artist{     
          return this.artists.find(art => art.idArtist  == id)!; 
           }  */
}
