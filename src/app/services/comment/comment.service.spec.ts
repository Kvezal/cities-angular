import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import {
  ApiModule,
  CommentApiService,
  ICommentParams
} from '@api';
import { IComment } from '@interfaces';

import { CommentService } from './comment.service';


const hotelId = `240d821a-b2e5-437f-afb9-7e840eafba81`;

const commentParams: ICommentParams = {
  text: `Quisque tincidunt pede ac urna. Etiam vestibulum massa rutrum magna.`,
  hotelId: `240d821a-b2e5-437f-afb9-7e840eafba81`,
  rating: 4,
};

const comment: IComment = {
  id: `fe509780-6b89-44db-a669-f984a5f86072`,
  text: commentParams.text,
  createdAt: new Date().toISOString(),
  rating: commentParams.rating,
  user: {
    id: `0a70cb15-3729-46ad-9dc7-b2d0b22c4c9c`,
    name: `uzp1auop9`,
    type: `pro`,
    image: `images/avatars/1.jpg`
  },
};

describe(`CommentService`, () => {
  let service: CommentService;
  let commentApiService: CommentApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ApiModule],
      providers: [
        {
          provide: CommentApiService,
          useValue: {
            loadList: () => of([comment]),
            create: () => of(comment),
          },
        },
      ],
    });
    service = TestBed.inject(CommentService);
    commentApiService = TestBed.inject(CommentApiService);
  });

  it(`should be created`, () => {
    expect(service).toBeTruthy();
  });

  describe(`loadList`, () => {
    it(`should call loadList of CommentApiService`, () => {
      const loadList = spyOn(commentApiService, `loadList`).and.callThrough();
      service.loadList(hotelId);
      expect(loadList).toHaveBeenCalledTimes(1);
    });

    it(`should call loadList of CommentApiService with params`, () => {
      const loadList = spyOn(commentApiService, `loadList`).and.callThrough();
      service.loadList(hotelId);
      expect(loadList).toHaveBeenCalledWith(hotelId);
    });

    it(`should accumulate load list`, () => {
      let commentList: IComment[] = [];
      service.commentList$.subscribe((newCommentList: IComment[]) => {
        commentList = newCommentList;
      });
      service.loadList(hotelId);
      expect(commentList).toEqual([comment]);
      service.loadList(hotelId);
      expect(commentList).toEqual([comment, comment]);
      service.loadList(hotelId);
      expect(commentList).toEqual([comment, comment, comment]);

    });
  });

  describe(`create`, () => {
    it(`should call create of CommentApiService`, () => {
      const create = spyOn(commentApiService, `create`).and.callThrough();
      service.create(commentParams);
      expect(create).toHaveBeenCalledTimes(1);
    });

    it(`should call create of CommentApiService with params`, () => {
      const create = spyOn(commentApiService, `create`).and.callThrough();
      service.create(commentParams);
      expect(create).toHaveBeenCalledTimes(1);
    });

    it(`should add created comment to the top of the comment list`, () => {
      const newComment: IComment = {
          id: `5ccc7011-5aa2-4c02-9dad-95d366cc2e99`,
          text: `Quisque purus sapien, gravida non, sollicitudin a, malesuada id, erat.`,
          createdAt: `2020-12-25T09:48:25.249Z`,
          rating: 2,
          user: {
            id: `d2d065c6-8d3c-482d-833e-aa74d25ade1e`,
            name: `zq957x5ozb`,
            type: `standard`,
            image: `images/avatars/10.jpg`
          }
        };
      spyOn(commentApiService, `create`).and.returnValue(of(newComment));
      let commentList: IComment[] = [];
      service.commentList$.subscribe((newCommentList: IComment[]) => {
        commentList = newCommentList;
      });
      service.loadList(hotelId);
      service.create(commentParams);
      expect(commentList[0]).toBe(newComment);
    });
  });

  describe(`resetList`, () => {
    it(`should reset comment list`, () => {
      let commentList: IComment[] = [];
      service.commentList$.subscribe((newCommentList: IComment[]) => {
        commentList = newCommentList;
      });
      service.loadList(hotelId);
      expect(commentList).toEqual([comment]);
      service.resetList();
      expect(commentList).toEqual([]);
    });
  });
});
