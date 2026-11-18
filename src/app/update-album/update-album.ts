import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Album } from '../model/album.model';
import { AlbumService as AlbumService } from '../services/album';
import { Artist } from '../model/artist.model';

@Component({
  selector: 'app-update-album',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './update-album.html',
})
export class UpdateAlbum implements OnInit {
  currentAlbum: Album = {};
  dateAlbum = '';
  artists: Artist[] = [];
  updatedArtistId!: number;

  constructor(
    private activatedRoute: ActivatedRoute,
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
    const id = Number(this.activatedRoute.snapshot.params['id']);
    this.albumService.consulterAlbum(id).subscribe((album) => {
      this.currentAlbum = album;
      this.dateAlbum = album.dateSortie
        ? new Date(String(album.dateSortie)).toISOString().slice(0, 10)
        : '';
      this.updatedArtistId = album.artist?.idArtist ?? 0;
    });
  }

  updateAlbum(): void {
    this.currentAlbum.artist = this.artists.find(
      (artist) => artist.idArtist == this.updatedArtistId,
    )!;
    this.currentAlbum.dateSortie = this.dateAlbum
      ? new Date(`${this.dateAlbum}T00:00:00`)
      : undefined;
    this.albumService.modifierAlbum(this.currentAlbum).subscribe((album) => {
      console.log(album);
      this.router.navigate(['/album']);
    });
  }
}
