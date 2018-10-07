import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/Forms';
import { AppRoutingModule } from './app-routing.module';
import { NgxSmartModalModule } from 'ngx-smart-modal';
import { ImageUploadModule } from 'angular2-image-upload';

import { DataService } from './services/data.service';

import { AppComponent } from './app.component';
import { UserComponent } from './components/user/user.component';
import { LibraryComponent } from './components/library/library.component';
import { UploadImageComponent } from './components/upload-image/upload-image.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { GalleryComponent } from './components/gallery/gallery.component';

@NgModule({
  /* composants */
  declarations: [
    AppComponent,
    UserComponent,
    LibraryComponent,
    PageNotFoundComponent,
    UploadImageComponent,
    GalleryComponent
  ],
  /* modules */
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    NgxSmartModalModule.forRoot(),
    ImageUploadModule.forRoot()
  ],
  /* services */
  providers: [
    DataService
  ],
  /* autre */
  bootstrap: [
    AppComponent
  ]
})

export class AppModule {

}
