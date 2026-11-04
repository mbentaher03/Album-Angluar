import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Album } from '../model/album.model';
import { Album as AlbumService } from '../services/album';
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
    this.artists = this.albumService.listeArtist();
    const id = Number(this.activatedRoute.snapshot.params['id']);
    this.currentAlbum = this.albumService.consulterAlbum(id);
    this.dateAlbum = this.currentAlbum.DateAlbum?.toISOString().slice(0, 10) ?? '';
    this.updatedArtistId = this.currentAlbum.artist?.idArtist ?? 0;
  }

  updateAlbum(): void {
    this.currentAlbum.artist = this.albumService.consulterArtist(this.updatedArtistId);
    this.currentAlbum.DateAlbum = this.dateAlbum
      ? new Date(`${this.dateAlbum}T00:00:00`)
      : undefined;
    this.albumService.modifierAlbum(this.currentAlbum);
    this.router.navigate(['/album']);
  }
}
