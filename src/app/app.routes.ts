import { Routes } from '@angular/router';
import { Albums } from './albums/albums';
import { AddAlbum } from './add-album/add-album';
import { UpdateAlbum } from './update-album/update-album';


export const routes: Routes = [
    {path: "album", component : Albums},
    {path: "add-album", component : AddAlbum},
    {path: "updateAlbum/:id", component: UpdateAlbum},
    {path: "", redirectTo: "album", pathMatch: "full"}
];
