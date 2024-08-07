import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RolesService } from './roles.service';

describe('RolesService', () => {
  let service: RolesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [RolesService]
    });
    service = TestBed.inject(RolesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
