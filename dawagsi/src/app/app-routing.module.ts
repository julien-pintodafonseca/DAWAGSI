import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LibraryComponent } from "./components/library/library.component";
import { PageNotFoundComponent } from "./components/page-not-found/page-not-found.component";
import { ShowListComponent } from "./components/show-list/show-list.component";
import { AnnotationComponent } from "./components/annotation/annotation.component";

//temporaires à supprimer
import { UploadImageComponent } from "./components/upload-image/upload-image.component";
import { GalleryListsComponent } from "./components/gallery-lists/gallery-lists.component";
import { NavigationComponent } from "./components/navigation/navigation.component";
import { CreateListAComponent } from "./components/create-list-a/create-list-a.component";
import { CreateListBComponent } from "./components/create-list-b/create-list-b.component";
import { EditListComponent } from "./components/edit-list/edit-list.component";
import { GalleryImagesComponent } from "./components/gallery-images/gallery-images.component";
import { HomeComponent } from "./components/home/home.component";

const routes: Routes = [
  {
    path: "",
    redirectTo: "accueil",
    pathMatch: "full"
  },
  {
    path: "accueil",
    component: HomeComponent
  },
  {
    path: "bibliotheque",
    component: LibraryComponent
  },
  {
    path: "liste",
    component: ShowListComponent
  },
  {
    path: "annotation",
    component: AnnotationComponent
  },
  {
    path: "create-list-a", //temporaire à supprimer
    component: CreateListAComponent
  },
  {
    path: "create-list-b", //temporaire à supprimer
    component: CreateListBComponent
  },
  {
    path: "edit-list", //temporaire à supprimer
    component: EditListComponent
  },
  {
    path: "upload-image", //temporaire à supprimer
    component: UploadImageComponent
  },
  {
    path: "navigation", //temporaire à supprimer
    component: NavigationComponent
  },
  {
    path: "gallery-lists", //temporaire à supprimer
    component: GalleryListsComponent
  },
  {
    path: "gallery-images", //temporaire à supprimer
    component: GalleryImagesComponent
  },
  {
    path: "**",
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
