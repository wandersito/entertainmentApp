import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailTvShow } from './detail.tv-show';

describe('DetailTvShow', () => {
  let component: DetailTvShow;
  let fixture: ComponentFixture<DetailTvShow>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailTvShow ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailTvShow);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
