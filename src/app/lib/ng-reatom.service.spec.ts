import { TestBed } from '@angular/core/testing';

import { NgReatom } from './ng-reatom.service';

describe('ReatomService', () => {
    beforeEach(() => TestBed.configureTestingModule({}));

    it('should be created', () => {
        const service: NgReatom = TestBed.get(NgReatom);
        expect(service).toBeTruthy();
    });
});
