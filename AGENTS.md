# Repository Guidelines

## Project Structure & Module Organization
This is a React Native TypeScript app targeting macOS, iOS, and Android.
- `App.tsx`: app composition root.
- `src/components/`: UI components (PascalCase files like `TaskList.tsx`).
- `src/hooks/`: stateful hooks (`useTasks.ts`, `useTheme.ts`).
- `src/storage/`: persistence logic (AsyncStorage-backed).
- `src/utils/`: pure helpers (`dateUtils.ts`, `idUtils.ts`).
- `src/theme/`: colors and shared styles.
- `src/types/`: shared TypeScript types.
- `__tests__/`: Jest tests (`App.test.tsx`).
- `ios/`, `android/`, `macos/`: platform projects and native configs.

## Build, Test, and Development Commands
- `npm install`: install JS dependencies.
- `npm run start`: start Metro bundler (default RN).
- `npm run start:macos`: start Metro on port `8081` for macOS.
- `npm run macos`: build and run macOS app (starts Metro automatically).
- `npm run build:macos`: compile macOS target without launching.
- `npm run ios`: run iOS app.
- `npm run android`: run Android app.
- `npm run lint`: run ESLint across repository.
- `npm test`: run Jest tests.

## Coding Style & Naming Conventions
- Language: TypeScript (`.ts`/`.tsx`) for app code.
- Formatting: Prettier (`singleQuote: true`, `trailingComma: all`, `bracketSpacing: false`, `arrowParens: avoid`).
- Linting: ESLint via `@react-native` config.
- Indentation: 2 spaces; keep imports grouped and sorted logically.
- Naming: components in PascalCase, hooks with `use` prefix, helpers/types in camelCase.

## Testing Guidelines
- Framework: Jest with `preset: react-native` and `react-test-renderer`.
- Keep tests near `__tests__/` using `*.test.tsx` / `*.test.ts` naming.
- Add/adjust tests when changing component rendering, hooks, or utility behavior.
- Run `npm test` before opening a PR.

## Commit & Pull Request Guidelines
Git history is not available in this workspace snapshot, so follow a clear conventional style:
- Commit format: `type(scope): short summary` (e.g., `feat(tasks): add day-level task counts`).
- Keep commits focused; avoid mixing refactor and behavior changes.
- PRs should include: purpose, key changes, test evidence (`npm test`, `npm run lint`), and UI screenshots for visual updates.
- Link related issues/tasks and call out platform impact (`ios`, `android`, `macos`) when relevant.

## Security & Configuration Tips
- Do not commit secrets or machine-specific config.
- Keep local environment files and credentials out of version control.
- For macOS/iOS native deps, run CocoaPods from the platform folder when needed (for example: `cd macos && pod install`).
