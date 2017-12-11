import {Routes, RouterModule} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';
import {NasaTestComponent} from './components/nasa-test/nasa-test.component';
import {NasaPictureTestComponent} from './components/nasa-picture-test/nasa-picture-test.component';

import {FrontPageComponent} from './components/user/front-page/front-page.component';
import {NasaPictureDetailsComponent} from './components/nasa-picture-details/nasa-picture-details.component';
import {ApodComponent} from './components/apod/apod.component';
import {ApodarchiveComponent} from './components/apodarchive/apodarchive.component';
import {RegisterComponent} from './components/user/register/register.component';
import {ProfileComponent} from './components/user/profile/profile.component';
import {PostComponent} from './components/post/post.component';
import {PostListComponent} from './components/post-list/post-list.component';
import {PublicProfileComponent} from './components/user/public-profile/public-profile.component';
import {CreatePostComponent} from './components/create-post/create-post.component';
import {SearchComponent} from './components/search/search.component';
import {UserAlbumComponent} from './components/album/user-album/user-album.component';
import {AlbumNewComponent} from './components/album/album-new/album-new.component';
import {PictureNewComponent} from './components/picture/picture-new/picture-new.component';
import {UserPicturesComponent} from './components/picture/user-pictures/user-pictures.component';
import {AlbumListComponent} from './components/album/album-list/album-list.component';
import {CreateObjectComponent} from './components/create-object/create-object.component';
import {AuthGuard} from './services/auth-guard.service.client';
import {HomepageComponent} from './components/homepage/homepage.component';
import {EditObjectComponent} from './components/edit-object/edit-object.component';
import {EditUserObjectComponent} from './components/edit-object/edit-user-object/edit-user-object.component';
import {EditCelestialEventObjectComponent} from './components/edit-object/edit-celestial-event-object/edit-celestial-event-object.component';
import {EditCelestialBodyObjectComponent} from './components/edit-object/edit-celestial-body-object/edit-celestial-body-object.component';
import {EditPublicationObjectComponent} from './components/edit-object/edit-publication-object/edit-publication-object.component';
import {AdminUserListComponent} from './components/admin-user-list/admin-user-list.component';
import {AdminServiceClient} from './services/admin.service.client';


const APP_ROUTES: Routes = [
  {path: '', component: HomepageComponent},
  {path: 'default', component: HomepageComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'admin/user', component: AdminUserListComponent, canActivate:[AdminServiceClient]},
  {path: 'edit/:objId', component: EditObjectComponent},
  {path: ':obtype/:uid', component: PublicProfileComponent, canActivate: [AuthGuard]},
  {path: ':obtype/:uid/edit', component: ProfileComponent},
  // {path: 'edit', component: EditPublicationObjectComponent},
  {path: 'searchAsteroids', component: NasaTestComponent},
  {path: 'login', component: FrontPageComponent},
  {path: 'nasa-pic', component: NasaPictureTestComponent},
  {path: 'search', component: SearchComponent},
  {path: 'APOD', component: ApodComponent},
  {path: 'APOD/Archive', component: ApodarchiveComponent},
  {path: 'nasa-pic/:imgid/details', component: NasaPictureDetailsComponent},
  {path: 'testPostComponent', component: PostComponent}, // these paths are temporary, will likely be renamed
  {path: 'testListComponent', component: PostListComponent}, // these paths are temporary, will likely be renamed.
  {path: 'new', component: CreateObjectComponent},
  {path: 'user/:uid/posts/new', component: CreatePostComponent},
  {path: 'user/:uid/album', component: AlbumListComponent},
  {path: 'user/:uid/album/new', component: AlbumNewComponent},
  {path: 'user/:uid/album/:aid', component: UserAlbumComponent},
  {path: 'user/:uid/album/:aid/pic/new', component: PictureNewComponent},
  {path: 'user/:uid/album/:aid/pic/:picid', component: UserPicturesComponent},
  {path: ':obtype/:uid/posts/new', component: CreatePostComponent}
  // so on
];


// Export the routes as module providers
export const Routing: ModuleWithProviders = RouterModule.forRoot(APP_ROUTES);
