import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateListAComponent } from './create-list-a.component';

describe('CreateListAComponent', () => {
  let component: CreateListAComponent;
  let fixture: ComponentFixture<CreateListAComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateListAComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateListAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
