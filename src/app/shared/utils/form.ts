import { FormControl } from '@angular/forms';

// mapped type
export type FormGroupFromModel<T> = {
  [Property in keyof T]: FormControl<T[Property]>;
};
