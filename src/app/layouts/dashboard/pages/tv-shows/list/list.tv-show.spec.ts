import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTvShow } from './list.tv-show';

describe('ListTvShow', () => {
  let component: ListTvShow;
  let fixture: ComponentFixture<ListTvShow>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListTvShow ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListTvShow);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
