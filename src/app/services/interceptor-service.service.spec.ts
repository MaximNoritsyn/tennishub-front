/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { InterceptorServiceService } from './interceptor-service.service';

describe('Service: InterceptorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InterceptorServiceService]
    });
  });

  it('should ...', inject([InterceptorServiceService], (service: InterceptorServiceService) => {
    expect(service).toBeTruthy();
  }));
});
