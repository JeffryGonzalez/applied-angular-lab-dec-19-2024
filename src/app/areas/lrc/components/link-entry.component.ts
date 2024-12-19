import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
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
        <input
          formControlName="link"
          name="link"
          type="url"
          class="input input-primary"
        />
      </div>
      <button type="submit" class="btn btn-primary">Add Link</button>
    </form>

    <a routerLink="../" class="btn btn-secondary">Back to List</a>`,
  styles: ``,
})
export class LinkEntryComponent {
  store = inject(PostsStore);
  form = new FormGroup<FormModel>({
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
    link: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
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
