import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FormGroupFromModel } from '@shared';
import { PostsStore } from '../services/post-store';
import { PostCreateModel } from '../types';
import { RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { debounceTime, tap } from 'rxjs';

type FormModel = FormGroupFromModel<PostCreateModel>;

@Component({
  selector: 'app-lrc-entry',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, RouterLink],
  template: ` <form [formGroup]="form" (ngSubmit)="addPost()">
      <div class="form-control">
        <label for="name" class="label">Name of Post</label>
        <input
          formControlName="name"
          name="name"
          type="text"
          class="input input-primary"
        />
        @let nameField = form.controls.name;
        @if (nameField.errors && (nameField.touched || nameField.dirty)) {
          <div class="alert alert-error">
            @if (nameField.hasError('required')) {
              <p>Need A Name</p>
            }
            @if (nameField.hasError('minlength')) {
              <p>Too Short</p>
            }
          </div>
        }
      </div>
      <div class="form-control">
        <label for="description" class="label">Description</label>
        <textarea
          name="description"
          type="text"
          class="input input-primary"
          formControlName="description"
        ></textarea>
      </div>
      <div class="form-control">
        <label for="link" class="label">URL</label>
        @for (link of form.controls.links.controls; track $index) {
          <div class="flex  gap-2" formArrayName="link">
            <label for="link-{{ $index }}">
              Link for video {{ $index + 1 }}:
            </label>
            <input
              name="link-{{ $index }}"
              class="input input-primary w-3/4"
              placeholder="link for video {{ $index + 1 }}"
            /><button
              (click)="addLink()"
              class="btn btn-xs btn-success btn-circle"
            >
              +
            </button>
            <button
              (click)="removeLink($index)"
              class="btn btn-xs btn-error btn-circle"
            >
              -
            </button>
          </div>
        }
      </div>
      <button type="submit" class="btn btn-primary">Add Link</button>
    </form>

    <a routerLink="../" class="btn btn-secondary">Back to List</a>`,
  styles: ``,
})
export class LinkVideoSeriesEntryComponent {
  removeLink(index: number) {
    this.form.controls.links.removeAt(index);
  }
  addLink() {
    this.form.controls.links.insert(
      -1,
      new FormControl('', { nonNullable: true }),
    );
  }
  store = inject(PostsStore);
  form = new FormGroup({
    name: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(100),
      ],
    }),
    description: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    links: new FormArray([new FormControl('', { nonNullable: true })]),
  });

  constructor() {
    this.form.patchValue(this.store.savedPost());
    this.form.valueChanges
      .pipe(
        takeUntilDestroyed(),
        debounceTime(250), // only do this every 250 ms
        tap((v) => this.store.setSavedEntry(v)),
      )
      .subscribe();
  }

  addPost() {
    if (this.form.valid) {
      // if we are here, everything is cool.
      const newPostRequest: PostCreateModel = this.form
        .value as unknown as PostCreateModel;
      this.store.addPost(newPostRequest);
      // TODO: 2. Explain this
      this.form.reset();
    } else {
      // TODO: 1. Explain This.
      this.form.markAllAsTouched();
    }
  }
}
