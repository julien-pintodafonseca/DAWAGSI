import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/Forms";
import { AppRoutingModule } from "./app-routing.module";
import { NgxSmartModalModule } from "ngx-smart-modal";
import { ImageUploadModule } from "angular2-image-upload";

import { DataService } from "./services/data.service";

import { AppComponent } from "./app.component";
import { LibraryComponent } from "./components/library/library.component";
import { UploadImageComponent } from "./components/upload-image/upload-image.component";
import { PageNotFoundComponent } from "./components/page-not-found/page-not-found.component";
import { GalleryListsComponent } from "./components/gallery-lists/gallery-lists.component";
import { NavigationComponent } from "./components/navigation/navigation.component";
import { CreateListAComponent } from "./components/create-list-a/create-list-a.component";
import { CreateListBComponent } from "./components/create-list-b/create-list-b.component";
import { EditListComponent } from "./components/edit-list/edit-list.component";
import { ShowListComponent } from "./components/show-list/show-list.component";
import { GalleryImagesComponent } from "./components/gallery-images/gallery-images.component";
import { AnnotationComponent } from "./components/annotation/annotation.component";

@NgModule({
  /* composants */
  declarations: [
    AppComponent,
    LibraryComponent,
    PageNotFoundComponent,
    UploadImageComponent,
    GalleryListsComponent,
    NavigationComponent,
    CreateListAComponent,
    CreateListBComponent,
    EditListComponent,
    ShowListComponent,
    GalleryImagesComponent,
    AnnotationComponent
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
  providers: [DataService],
  /* autre */
  bootstrap: [AppComponent]
})
export class AppModule {}
