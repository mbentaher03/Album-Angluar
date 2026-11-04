import { Artist } from "./artist.model";
export interface Album {
  idAlbum?: number;
  titreAlbum?: string;
  genreMusical?: string;
  DateAlbum?: Date;
  artist? : Artist ;
}
