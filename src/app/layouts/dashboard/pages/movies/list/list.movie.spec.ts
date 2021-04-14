import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListMovie } from './list.movie';

describe('ListMovie', () => {
  let component: ListMovie;
  let fixture: ComponentFixture<ListMovie>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListMovie ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListMovie);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
