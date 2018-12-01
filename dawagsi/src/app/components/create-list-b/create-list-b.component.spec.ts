import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateListBComponent } from './create-list-b.component';

describe('CreateListBComponent', () => {
  let component: CreateListBComponent;
  let fixture: ComponentFixture<CreateListBComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateListBComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateListBComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
