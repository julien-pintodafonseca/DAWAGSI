import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { AppRoutingModule } from "./app-routing.module";
import { NgxSmartModalModule } from "ngx-smart-modal";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatCheckboxModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';

import { FileSelectDirective } from 'ng2-file-upload';

import { Globals } from './globals';

import { AppComponent } from "./app.component";
import { LibraryComponent } from "./components/library/library.component";
import { UploadImageComponent } from "./components/upload-image/upload-image.component";
import { PageNotFoundComponent } from "./components/page-not-found/page-not-found.component";
import { NavigationComponent } from "./components/navigation/navigation.component";
import { EditListComponent } from "./components/edit-list/edit-list.component";
import { ShowListComponent } from "./components/show-list/show-list.component";
import { GalleryImagesComponent } from "./components/gallery-images/gallery-images.component";
import { AnnotationComponent } from "./components/annotation/annotation.component";
import { HomeComponent } from './components/home/home.component';

@NgModule({
  /* composants */
  declarations: [
    AppComponent,
    LibraryComponent,
    PageNotFoundComponent,
    UploadImageComponent,
    NavigationComponent,
    EditListComponent,
    ShowListComponent,
    GalleryImagesComponent,
    AnnotationComponent,
    FileSelectDirective,
    HomeComponent
  ],
  /* modules */
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    NgxSmartModalModule.forRoot(),
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    HttpClientModule
  ],
  /* services */
  providers: [Globals],
  /* autre */
  bootstrap: [AppComponent]
})
export class AppModule { }
