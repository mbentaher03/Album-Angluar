import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Album as AlbumModel } from '../model/album.model';
import { Artist } from '../model/artist.model';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class AlbumService {
  // Corrected paths matching your Spring Boot @RequestMapping annotations
  apiURL: string = "http://localhost:8086/albums/api";
  apiURLArt: string = "http://localhost:8086/albums/api/art"; 
  
  album!: AlbumModel;

  constructor(private http: HttpClient, private authService: AuthService) {}

  listeAlbums(): Observable<AlbumModel[]> {
     
      return this.http.get<AlbumModel[]>(this.apiURL + "/all"); 
  }

  rechercherParArtist(idArtist: number): Observable<AlbumModel[]> {
    const url = `${this.apiURL}/albArt/${idArtist}`; // Matches @GetMapping("/albArt/{idArtist}") in your controller
    let jwt = this.authService.getToken();
    let httpHeaders = new HttpHeaders({"Authorization": "Bearer " + jwt});
    return this.http.get<AlbumModel[]>(url, { headers: httpHeaders });
  }

  rechercherParNom(titre: string): Observable<AlbumModel[]> {
    const url = `${this.apiURL}/albsByTitre/${encodeURIComponent(titre)}`; // Matches your controller
    let jwt = this.authService.getToken();
    let httpHeaders = new HttpHeaders({"Authorization": "Bearer " + jwt});
    return this.http.get<AlbumModel[]>(url, { headers: httpHeaders });
  }

  consulterAlbum(id: number): Observable<AlbumModel> {
    const url = `${this.apiURL}/getbyid/${id}`; 
    let jwt = this.authService.getToken(); 
    let httpHeaders = new HttpHeaders({"Authorization": "Bearer " + jwt});  
    return this.http.get<AlbumModel>(url, { headers: httpHeaders }); 
  }

  ajouterAlbum(album: AlbumModel): Observable<AlbumModel> {
    let jwt = this.authService.getToken(); 
    let httpHeaders = new HttpHeaders({ "Authorization": "Bearer " + jwt, "Content-Type": "application/json" });  
    return this.http.post<AlbumModel>(this.apiURL + "/addAlbum", album, { headers: httpHeaders });
  }

  supprimerAlbum(id: number) {
    const url = `${this.apiURL}/deleteAlbum/${id}`; 
    let jwt = this.authService.getToken(); 
    let httpHeaders = new HttpHeaders({"Authorization": "Bearer " + jwt});  
    return this.http.delete(url, { headers: httpHeaders });
  }

  modifierAlbum(album: AlbumModel): Observable<AlbumModel> {
    let jwt = this.authService.getToken(); 
    let httpHeaders = new HttpHeaders({ "Authorization": "Bearer " + jwt, "Content-Type": "application/json" });  
    return this.http.put<AlbumModel>(this.apiURL + "/updateAlbum", album, { headers: httpHeaders });
  }

listeArtist(): Observable<Artist[]> {
    let jwt = this.authService.getToken(); 
    let httpHeaders = new HttpHeaders({"Authorization": "Bearer " + jwt}); 
    return this.http.get<Artist[]>(this.apiURLArt, { headers: httpHeaders });
  }

  ajouterArtist(artist: Artist): Observable<Artist> {
    let jwt = this.authService.getToken(); 
    let httpHeaders = new HttpHeaders({ "Authorization": "Bearer " + jwt, "Content-Type": "application/json" }); 
    return this.http.post<Artist>(this.apiURLArt, artist, { headers: httpHeaders }); // Uses apiURLArt
  }
}