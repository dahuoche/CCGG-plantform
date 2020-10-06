import { TestBed } from '@angular/core/testing';

import { MockInterviewService } from './mock-interview.service';

describe('MockInterviewService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MockInterviewService = TestBed.get(MockInterviewService);
    expect(service).toBeTruthy();
  });
});
