import { Routes } from '@angular/router';
import { Albums } from './albums/albums';
import { AddAlbum } from './add-album/add-album';
import { UpdateAlbum } from './update-album/update-album';
import { RechercheParArtist } from './recherche-par-artist/recherche-par-artist';
import { RechercheParNom } from './recherche-par-nom/recherche-par-nom';
import { ListeArtistsComponent } from './liste-artists/liste-artists';
import { Login } from './login/login';
import { adminGuard } from './services/admin.guard';
import { Forbidden } from './forbidden/forbidden';
import { Register } from './register/register';
import { VerifyEmail } from './verify-email/verify-email';


export const routes: Routes = [
    {path: "album", component : Albums},
    {path: "add-album", component : AddAlbum, canActivate: [adminGuard]},
    {path: "updateAlbum/:id", component: UpdateAlbum, canActivate: [adminGuard]},
    {path: "", redirectTo: "album", pathMatch: "full"},
    {path: "rechercheParArtist", component : RechercheParArtist},
    {path: "rechercheParNom", component: RechercheParNom},
    {path: "listeArtists", component: ListeArtistsComponent, canActivate: [adminGuard]},
    {path: "login", component: Login},
    {path: "register", component: Register},
    {path: "verifyEmail", component: VerifyEmail},
    {path: "app-forbidden", component: Forbidden}
];
