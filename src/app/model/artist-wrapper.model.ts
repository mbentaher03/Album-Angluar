import { Artist } from './artist.model';

export class ArtistWrapper {
  _embedded!: { artists: Artist[] };
}
