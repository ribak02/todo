# todo

React Native to-do app with Android, iOS, and macOS targets.

## Run as a macOS app

1. Install dependencies:

```bash
npm install
```

2. Install macOS CocoaPods (from project root):

```bash
cd macos && pod install && cd ..
```

3. Build and launch the macOS app:

```bash
npm run macos
```

`npm run macos` starts Metro automatically. If you prefer running Metro yourself, use `npm run start:macos` in one terminal and then `npm run macos` in another.

## Useful scripts

- `npm run start:macos`: Start Metro for macOS.
- `npm run macos`: Build and run the macOS app (starts Metro automatically).
- `npm run build:macos`: Build macOS app without launching.
- `npm run ios`: Run iOS target.
- `npm run android`: Run Android target.
- `npm test`: Run tests.
