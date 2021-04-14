import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CastSlideComponent } from './cast-slide.component';

describe('CastSlideComponent', () => {
  let component: CastSlideComponent;
  let fixture: ComponentFixture<CastSlideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CastSlideComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CastSlideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
