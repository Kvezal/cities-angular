import { TestBed } from '@angular/core/testing';

import { CommentApiService } from './comment-api.service';
import { ApiModule } from '../api.module';
import { ApiService } from '../api.service';
import { of } from 'rxjs';
import { IComment } from '@interfaces';
import { ApiPath } from '../api-path.enum';
import { ICommentParams } from './comment-api.interface';


const hotelId = `023dda52-f07b-47ef-a44c-2301f8743149`;

const commentParams: ICommentParams = {
  text: `test 1 test 1 test 1 test 1 test 1 test 1 test 1 `,
  hotelId: `240d821a-b2e5-437f-afb9-7e840eafba81`,
  rating: 4,
};

const comment: IComment = {
  id: `023dda52-f07b-47ef-a44c-2301f8743149`,
  text: commentParams.text,
  createdAt: `2020-12-14 14:19:16.628657`,
  rating: commentParams.rating,
  user: {
    id: `0b88066e-c543-451f-b4a0-67c0729335da`,
    name: `kvezal`,
    type: `standard`,
    image: `path/to/image.jpg`,
  },
};

describe('CommentApiService', () => {
  let service: CommentApiService;
  let apiService: ApiService;
  const basePath = ApiPath.COMMENT;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ApiModule],
      providers: [
        {
          provide: ApiService,
          useValue: {
            get: () => null,
            post: () => null,
          },
        }
      ]
    });
    service = TestBed.inject(CommentApiService);
    apiService = TestBed.inject(ApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe(`loadList`, () => {
    beforeEach(() => {
      spyOn(apiService, `get`).and.returnValue(of([comment]));
      service.loadList(hotelId);
    });

    it(`should call get method of ApiService`, () => {
      expect(apiService.get).toHaveBeenCalledTimes(1);
    });

    it(`should call get method with params`, () => {
      expect(apiService.get).toHaveBeenCalledWith(basePath, {
        queries: {hotelId},
      });
    });
  });

  describe(`create`, () => {
    beforeEach(() => {
      spyOn(apiService, `post`).and.returnValue(of(comment));
      service.create(commentParams);
    });

    it(`should call get method of ApiService`, () => {
      expect(apiService.post).toHaveBeenCalledTimes(1);
    });

    it(`should call get method with params`, () => {
      expect(apiService.post).toHaveBeenCalledWith(basePath, {
        body: commentParams,
      });
    });
  });
});
