import { TestBed } from '@angular/core/testing';

import { AllMediasService } from './all-medias.service';

describe('AllMediasService', () => {
  let service: AllMediasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AllMediasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
