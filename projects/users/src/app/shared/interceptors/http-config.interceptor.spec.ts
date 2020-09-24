import { TestBed } from '@angular/core/testing';

import { HttpConfigInterceptor } from './http-config.interceptor';

describe('HttpconfigInterceptor', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [HttpConfigInterceptor],
    })
  );

  it('should be created', () => {
    const interceptor: HttpconfigInterceptor = TestBed.inject(
      HttpConfigInterceptor
    );
    expect(interceptor).toBeTruthy();
  });
});
