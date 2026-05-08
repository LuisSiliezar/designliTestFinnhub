# Comelongo · Food Review App (`src/`)

A bare React Native source folder for **Comelongo**, a friendly food review
app implemented with **clean architecture**, styled with **NativeWind**
(Tailwind for React Native), and animated with **react-native-reanimated**.
The folder structure mirrors the existing Finnhub project (`@domain`, `@core`,
`@infrastructure`, `@config`, `@presentation`) and the visual language is the
Comelongo design system shipped in the Claude Design handoff bundle.

## Architecture layers

```
src/
├── domain/              # Pure entities, no external imports
│   └── entities/        # Dish, Restaurant, Review, User, Category
├── core/                # Application logic
│   ├── use-cases/       # Single-purpose async functions that take an HttpAdapter
│   ├── actions/         # Compose use-cases + adapters into screen-ready calls
│   └── store/           # Zustand stores (auth, favorites, review draft)
├── infrastructure/      # External world
│   ├── interfaces/      # API response shapes + component prop shapes
│   ├── mappers/         # API response  →  Domain entity
│   └── services/        # Mock data, push notifications, etc.
├── config/              # App wiring
│   ├── adapters/        # HttpAdapter (abstract) + AxiosAdapter implementation
│   └── api/             # Pre-configured axios instances
└── presentation/        # React Native UI (NativeWind classes)
    ├── theme/           # Comelongo design tokens (used by tailwind.config.js)
    ├── components/      # Pure / shared UI (ScoreBadge, Pill, CTAButton, …)
    │   ├── shared/      # Includes AnimatedPressable, HeartButton, SaveButton
    │   └── lists/       # FlatList wrappers with Reanimated entry animations
    ├── hooks/           # Screen-level data hooks
    ├── routes/          # AuthStack, AppTabs, RootNavigation, transitions.ts
    └── screens/         # One folder per feature
```

## Styling: NativeWind

Tailwind classes are mapped to the Comelongo design tokens in
`tailwind.config.js`:

```
bg-cream, bg-paper, bg-warm-gray
text-ink, text-ink-soft, text-muted, text-subtle
text-orange, bg-orange, bg-orange-soft, bg-orange-deep
border-border, border-border-strong
font-display (DM Serif Display) · font-ui (Plus Jakarta Sans)
rounded-sm/md/lg/xl/pill (10/14/20/28/9999)
```

Example:

```tsx
<View className="bg-paper border border-border rounded-lg p-4">
  <Text className="font-display text-2xl text-ink">Comelongo</Text>
</View>
```

## Animations

| Where                          | Animation                                      |
| ------------------------------ | ---------------------------------------------- |
| Every `AnimatedPressable`      | Spring scale-down (0.96) on press, fade        |
| `HeartButton`                  | Bounce + colour swap on like                   |
| `SaveButton`                   | Scale + slight tilt on toggle                  |
| `AnimatedScoreBadge`           | Pulse on score change                          |
| `SkeletonCard`                 | Looping shimmer opacity (no extra dep needed)  |
| `FeedScreen` / `CategoryScreen`/ `SearchScreen` | `FadeInDown` stagger on list items |
| `ReviewCard`                   | `FadeInDown.springify()` per card              |
| `OnboardingScreen` dots        | Spring-animated active dot width               |
| `CreatePostScreen` steps       | `FadeInDown` enter / `FadeOutUp` exit per step |
| Tab bar                        | Spring scale + colour for active tab           |
| Stack screens                  | Custom `slideFadeFromRight` with overlay       |
| Auth/Tabs root                 | `fadeUp` transition (cross-fade between flows) |
| `CreatePostScreen` modal       | `modalSlideUp` from bottom + dim overlay       |

All transitions live in `presentation/routes/transitions.ts`.

## Design system (Comelongo)

| Token         | Hex / value | Usage                              |
| ------------- | ----------- | ---------------------------------- |
| `ink`         | `#0E0E0E`   | Primary text & primary CTA         |
| `orange`      | `#FF5B1F`   | Brand accent, score highlight      |
| `orange-soft` | `#FFE7DB`   | Tinted backgrounds                 |
| `orange-deep` | `#D9421A`   | Pressed orange                     |
| `cream`       | `#FAF6F1`   | App background                     |
| `paper`       | `#FFFFFF`   | Cards                              |
| `green`       | `#1F8A5B`   | Score ≥ 8.5                        |
| Display font  | `DM Serif Display` (italic) | Review scores, editorial titles |
| UI font       | `Plus Jakarta Sans`         | Everything else                  |

`scoreColor(score)` returns green / orange / muted based on the score band
(8.5+, 6.5+, else).

## Screens (matching the design canvas)

**Auth stack** — `OnboardingScreen` → `LoginScreen` → `RegisterScreen` →
`ForgotPasswordScreen`

**App tabs** — `FeedScreen`, `SearchScreen` (Discover), `CreatePostScreen`
(modal, 5-step), `ProfileScreen`

**Pushed on top of tabs** — `DishDetailScreen`, `RestaurantDetailScreen`,
`CategoryScreen`, `EditProfileScreen`

**Settings** — `SettingsScreen`, `AboutScreen`

## Data source

Use-cases hit [TheMealDB](https://www.themealdb.com/api.php) (free, no auth) for
real dish/category data. Reviews and user profile data are generated by
`MockDataService`. Swap in your real API by changing
`config/api/mealdb.api.ts` and the `mealApiFetcher`.

## Required dependencies

```bash
yarn add axios zustand \
  @react-navigation/native @react-navigation/stack @react-navigation/bottom-tabs \
  react-native-gesture-handler react-native-screens react-native-safe-area-context \
  react-native-vector-icons react-native-dotenv \
  react-native-reanimated nativewind

yarn add -D tailwindcss@^3.4.17 prettier-plugin-tailwindcss

# iOS:
cd ios && pod install && cd ..
```

Drop the bundled config files at the project root (already shipped in this folder):

- `tailwind.config.js`
- `global.css`
- `nativewind-env.d.ts`
- `babel.config.js` (presets include `nativewind/babel` and `react-native-reanimated/plugin` last)
- `metro.config.js` (wraps `getDefaultConfig` with `withNativeWind`)

And these `paths` to `tsconfig.json`:

```json
{
  "extends": "@react-native/typescript-config/tsconfig.json",
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@src/*": ["src/*"],
      "@config/*": ["src/config/*"],
      "@assets/*": ["src/assets/*"],
      "@core/*": ["src/core/*"],
      "@domain/*": ["src/domain/*"],
      "@infrastructure/*": ["src/infrastructure/*"],
      "@presentation/*": ["src/presentation/*"]
    }
  }
}
```

Wire the root in `App.tsx` (note the `global.css` import for NativeWind):

```tsx
import './global.css';
import 'react-native-gesture-handler';
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import RootNavigation from '@presentation/routes/RootNavigation';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <NavigationContainer>
          <RootNavigation />
        </NavigationContainer>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
```

Set `API_URL` in `.env` (defaults to `https://www.themealdb.com/api/json/v1/1/`):

```
API_URL=https://www.themealdb.com/api/json/v1/1/
```
