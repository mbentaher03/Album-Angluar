import { Pipe, PipeTransform } from '@angular/core';
import { Album } from '../model/album.model';

@Pipe({
  name: 'searchFilter',
  standalone: true,
})
export class SearchFilterPipe implements PipeTransform {
  transform(list: Album[] | null | undefined, filterText: string = ''): Album[] {
    const titre = filterText.trim().toLocaleLowerCase();
    return list
      ? list.filter((album) => (album.titreAlbum ?? '').toLocaleLowerCase().includes(titre))
      : [];
  }
}
