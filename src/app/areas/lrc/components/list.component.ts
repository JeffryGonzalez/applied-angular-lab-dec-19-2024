import { AsyncPipe, DatePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { RelativeTimeComponent } from '@shared';
import { map } from 'rxjs';
import { PostApi } from '../services/post-api';
import { PostsStore } from '../services/post-store';
@Component({
  selector: 'app-lrc-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DatePipe, RelativeTimeComponent, RouterLink, AsyncPipe],
  template: `
    <div>
      <a routerLink="create" class="btn btn-primary">Add a Post</a>
    </div>
    @if (store.filter() !== null) {
      <a class="btn btn-sm btn-accent" routerLink="."
        >See All Posts not just those by {{ filter$ | async }}</a
      >
    }

    <div class="flex  flex-col gap-4">
      @for (post of store.posts(); track post.id) {
        <div class=" card bg-base-200 shadow-xl">
          <div class="card-body">
            <p class="card-title uppercase font-black">
              <a class="link" [routerLink]="['details', post.id]">
                {{ post.name }}</a
              >
            </p>

            <p>
              <a
                [href]="post.link"
                target="_blank"
                class="link text-blue-600"
                >{{ post.link }}</a
              >
            </p>
            <p class="text-lg  font-semibold">
              {{ post.description }}
            </p>
            <p>
              <span class="font-bold">Posted By: </span>
              <a
                class="link"
                routerLink="."
                [queryParams]="{ filter: post.postedBy }"
              >
                {{ post.postedBy }}
              </a>
            </p>
            <p>
              {{ post.datePosted | date: 'medium' }}
              <span class="text-sm   from-neutral-100 font-extralight">
                (<app-relative-time [date]="post.datePosted" />)
              </span>
            </p>
          </div>
        </div>
      }
    </div>
  `,
  styles: ``,
})
export class ListComponent {
  store = inject(PostsStore);
  router = inject(Router);
  route: ActivatedRoute = inject(ActivatedRoute);

  filter$ = this.route.queryParamMap.pipe(map((p) => p.get('filter')));
  destroyRef = inject(DestroyRef);
  constructor() {
    // injection context
    this.route.queryParamMap
      .pipe(
        map((p) => p.get('filter')), // the value of the filter query or null
        // filter((p) => p !== null), // stop here if it is null.
        takeUntilDestroyed(), // this
      )
      .subscribe((p) => this.store.setFilter(p));
  }

  doThisThing() {
    const api = inject(PostApi);
    // this is an example if in a weird case you want to subscribe somewhere
    // other than in the constructor of using takeUntilDestoyed with a destroyref
    this.route.queryParamMap
      .pipe(
        map((p) => p.get('filter')), // the value of the filter query or null
        // filter((p) => p !== null), // stop here if it is null.
        takeUntilDestroyed(this.destroyRef), // this
      )
      .subscribe((p) => this.store.setFilter(p));
  }
}
