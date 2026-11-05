import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Artist } from '../model/artist.model';

@Component({
  selector: 'app-update-artist',
  imports: [FormsModule],
  templateUrl: './update-artist.html',
  styles: ``,
})
export class UpdateArtist implements OnInit {
  @Input() artist!: Artist;
  @Input() ajout = true;
  @Output() artistUpdated = new EventEmitter<Artist>();

  ngOnInit(): void {
    console.log('ngOnInit du composant UpdateArtist', this.artist);
  }

  saveArtist(): void {
    this.artistUpdated.emit(this.artist);
  }
}
