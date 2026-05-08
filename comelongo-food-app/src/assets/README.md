# Assets

Drop static assets here (images, lottie animations, custom fonts, etc.).

Suggested layout:

```
assets/
├── animations/   # lottie .json
├── fonts/        # PlusJakartaSans-*.ttf, DMSerifDisplay-Regular.ttf
└── images/       # png/jpg/svg
```

The Comelongo design system uses two Google Fonts (free):

- **Plus Jakarta Sans** — UI text (weights 400, 500, 600, 700, 800)
- **DM Serif Display** — review scores and editorial titles

Download from Google Fonts and link them via `react-native.config.js`
(`assets: ['./src/assets/fonts']`) plus `npx react-native-asset`.
