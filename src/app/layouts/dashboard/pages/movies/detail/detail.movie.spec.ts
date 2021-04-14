import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailMovie } from './detail.movie';

describe('DetailMovie', () => {
  let component: DetailMovie;
  let fixture: ComponentFixture<DetailMovie>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailMovie ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailMovie);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
