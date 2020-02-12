import { TestBed } from '@angular/core/testing';

import { NgReatom } from './reatom.service';

describe('NgReatom', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NgReatom = TestBed.get(NgReatom);
    expect(service).toBeTruthy();
  });
});
