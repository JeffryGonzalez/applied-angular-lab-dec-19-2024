# Angular Starter

## `.vscode` Folder

- `extensions.json` - has additional extensions I recommend for doing Angular development.

  - Angular Language Service (`angular.ng-template`). **Required**
  - Prettier - (`esbenp.prettier-vscode`) - code formatting.
  - ESLint - (`dbaeumer.vscode-eslint`) - Linting for JS/TS
  - Tailwind (`bradlc.vscode-tailwindcss`) - Tailwind Intellisense.
  - TS Error Translator (`mattpocock.ts-error-transation`) - gives hints about TypeScript and better error messages.

- `settings.json` - Various settings I prefer for working in Angular.

- `tasks.json` - I have a run option so that when you open this directory, it automatically starts `ng serve -o`.

- `typescript.code-snippets`
  - Has two code snippets for creating Angular components.
  - `ngc` - Create an Angular Component
  - `ngrc` - Create an Angular Component, using the content of your clipboard for the template for the component.

## Additional NPM Packages

- Tailwind - forms, typography, autoprefixer, daisyui, postcss, tailwindcss
- Mock Service Workers (msw) - for creating test doubles for API access.

## Using This

Create a directory, and in that directory:

```sh
npx degit hypertheorytraining/angular-starter
npm i
code .
```

## The Code Snippets

There are three snippets in the `.vscode` folder.

### Create a new Component `ngc`

Create a new TypeScript source code file. In the file type `ngc` and then hit TAB. Use your tab key to cycle through the placeholder prompts.

Sample Output:

```typescript
import { Component, ChangeDetectionStrategy } from "@angular/core";

@Component({
  selector: "app-new-component",
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: ``,
  styles: ``,
})
export class NewComponent {}
```

### Refactor Code to a new Component `ngrc`

Copy some template code into your clipboard. Create a new TypeScript source code file. In the file type `ngrc` and then hit TAB. Use your tab key to cycle through the placeholder prompts.

Sample:

```typescript
import { Component, ChangeDetectionStrategy } from "@angular/core";

@Component({
  selector: "app-new-component",
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: `<p>Whole Lotta Stuff From the Clipboard</p>`,
  styles: ``,
})
export class NewComponent {}
```

### Create a Feature Route File `ngfr`

Create a new TypeScript source code file. In the file type `ngfr` and then hit TAB. Use your tab key to cycle through the placeholder prompts.

```typescript
import { Routes } from "@angular/router";
import { TodosComponent } from "./todos.component.ts";

export const TODOS_ROUTES: Routes = [
  {
    path: "",
    component: TodosComponent,
    children: [],
  },
];
```
