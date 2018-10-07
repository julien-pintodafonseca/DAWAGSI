import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GalleryListsComponent } from './gallery-lists.component';

describe('GalleryListsComponent', () => {
  let component: GalleryListsComponent;
  let fixture: ComponentFixture<GalleryListsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GalleryListsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GalleryListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
