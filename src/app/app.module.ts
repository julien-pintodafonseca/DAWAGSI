import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { UserComponent } from './components/user/user.component';
import { DataService } from './services/data.service';

import { FormsModule } from '@angular/Forms';
import { ImageUploadModule } from 'angular2-image-upload';
import { AppRoutingModule } from './app-routing.module';
import { LibraryComponent } from './components/library/library.component';
import { UploadImageComponent } from './components/upload-image/upload-image.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

@NgModule({
  /* composants */
  declarations: [
    AppComponent,
    UserComponent,
    LibraryComponent,
    UploadImageComponent,
    PageNotFoundComponent
  ],
  /* modules */
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
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
