import { HttpClient } from '@angular/common/http';
import {
  PostApiResponse,
  PostApiResponseItem,
  PostCreateModel,
} from '../types';
import { inject } from '@angular/core';
import { map } from 'rxjs';

export class PostApi {
  //constructor(private http: HttpClient) {}
  #http = inject(HttpClient);
  getPosts() {
    return this.#http.get<PostApiResponse>('/api/posts');
  }

  addPost(post: PostCreateModel, tempId: string) {
    return this.#http.post<PostApiResponseItem>('/api/posts', post).pipe(
      map((post) => ({
        post,
        tempId,
      })),
    );
  }
}
