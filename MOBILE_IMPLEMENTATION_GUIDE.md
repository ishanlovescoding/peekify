# Mobile App Implementation Guide
## React Native + Expo Strategy for Peekify/Replay

## Overview
This guide outlines the recommended approach for building a mobile version of Replay using React Native and Expo while maximizing code sharing with the existing Next.js web app.

---

## Approach 1: Monorepo with Shared Code (RECOMMENDED)

### Architecture
```
peekify/
├── apps/
│   ├── web/          # Next.js web app (current code)
│   └── mobile/       # Expo/React Native app
├── packages/
│   ├── ui/           # Shared UI components
│   ├── api/          # Shared API client
│   ├── types/        # Shared TypeScript types
│   ├── utils/        # Shared utilities
│   └── hooks/        # Shared React hooks
└── backend/          # Your existing backend
```

### Benefits
- ✅ Share business logic, API calls, types, and utilities
- ✅ Single source of truth for data models
- ✅ Easier to maintain consistency
- ✅ Faster development (write once, use everywhere)

### Setup Steps

#### 1. Install Monorepo Tool (Choose One)

**Option A: Turborepo (Recommended)**
```bash
# Initialize turborepo
npx create-turbo@latest

# Or add to existing project
npm install turbo --save-dev
```

**Option B: pnpm Workspaces (Already using pnpm)**
```bash
# Add to package.json root
{
  "name": "replay-monorepo",
  "private": true,
  "workspaces": [
    "apps/*",
    "packages/*"
  ]
}
```

#### 2. Create Expo App

```bash
# From project root
cd apps
npx create-expo-app mobile --template

# Or with TypeScript
npx create-expo-app mobile --template expo-template-blank-typescript
```

#### 3. Move Existing Code to apps/web

```bash
# Create apps directory
mkdir -p apps/web

# Move current Next.js app
mv app components contexts hooks lib styles types apps/web/
mv package.json tsconfig.json next.config.mjs apps/web/

# Keep backend separate
# (already in backend/ folder)
```

#### 4. Create Shared Packages

```bash
mkdir -p packages/{ui,api,types,utils,hooks}

# Initialize each package
cd packages/ui && npm init -y
cd ../api && npm init -y
cd ../types && npm init -y
cd ../utils && npm init -y
cd ../hooks && npm init -y
```

---

## What to Share vs What to Rewrite

### ✅ SHARE (95% code reuse possible)

#### 1. **API Layer** (`packages/api`)
```typescript
// packages/api/src/feed.ts
export const feedApi = {
  getFeed: async (page: number, limit: number) => {
    const response = await fetch(`${API_URL}/feed?page=${page}&limit=${limit}`);
    return response.json();
  },

  reactToPost: async (postId: string, emoji: string) => {
    // ... API call
  }
};
```

#### 2. **Types** (`packages/types`)
```typescript
// packages/types/src/post.ts
export interface Post {
  id: string;
  user: User;
  song: Song;
  timestamp: string;
  playCount: number;
  reactions: Reaction[];
}

export interface Song {
  name: string;
  artist: string;
  album: string;
  art: string;
  duration: string;
}
```

#### 3. **Business Logic & Hooks** (`packages/hooks`)
```typescript
// packages/hooks/src/useFeed.ts
import { useInfiniteQuery } from '@tanstack/react-query';
import { feedApi } from '@repo/api';

export const useFeed = () => {
  return useInfiniteQuery({
    queryKey: ['feed'],
    queryFn: ({ pageParam = 1 }) => feedApi.getFeed(pageParam, 20),
    getNextPageParam: (lastPage, pages) =>
      lastPage.hasMore ? pages.length + 1 : undefined,
  });
};
```

#### 4. **Utilities** (`packages/utils`)
```typescript
// packages/utils/src/date.ts
export const formatTimestamp = (date: Date) => {
  // ... shared logic
};

// packages/utils/src/validation.ts
export const validateEmail = (email: string) => {
  // ... shared logic
};
```

#### 5. **Auth Context** (`packages/hooks/src/useAuth.ts`)
```typescript
// Can be shared with platform-specific storage
export const useAuth = () => {
  // Use AsyncStorage on mobile, localStorage on web
  const storage = Platform.select({
    web: () => localStorage,
    default: () => AsyncStorage
  })();

  // ... auth logic
};
```

### ❌ REWRITE (Platform-Specific)

#### 1. **UI Components** (Similar but different libraries)

**Web (Framer Motion)**
```tsx
// apps/web/components/PostCard.tsx
<motion.div whileHover={{ scale: 1.02 }}>
  <img src={post.song.art} />
</motion.div>
```

**Mobile (React Native Reanimated)**
```tsx
// apps/mobile/components/PostCard.tsx
<Animated.View entering={FadeIn} exiting={FadeOut}>
  <Image source={{ uri: post.song.art }} />
</Animated.View>
```

#### 2. **Navigation**

**Web (Next.js App Router)**
```tsx
import { useRouter } from 'next/navigation';
import Link from 'next/link';
```

**Mobile (Expo Router or React Navigation)**
```tsx
import { useRouter } from 'expo-router';
import { Link } from 'expo-router';
```

#### 3. **Storage**

**Web:** `localStorage`, `sessionStorage`
**Mobile:** `AsyncStorage`, `SecureStore`

---

## Mobile Tech Stack Recommendations

### Core
- **Expo SDK 51+** - Latest stable version
- **Expo Router** - File-based routing (like Next.js)
- **TypeScript** - Already using

### UI & Animation
- **React Native Reanimated 3** - Smooth 60fps animations (replaces Framer Motion)
- **React Native Gesture Handler** - Touch interactions
- **Expo Linear Gradient** - Gradient backgrounds
- **React Native SVG** - Icon support

### State & Data
- **TanStack Query** - Already using, works on mobile!
- **Zustand** or **Jotai** - Lightweight state management
- **AsyncStorage** - Local storage

### Audio/Music
- **Expo AV** - Audio playback
- **expo-spotify-auth** - Spotify OAuth (community)

### Push Notifications
- **Expo Notifications** - For 9:30 PM reveal notifications

### Installation
```bash
# In apps/mobile
npx expo install react-native-reanimated react-native-gesture-handler
npx expo install expo-linear-gradient expo-av
npx expo install @tanstack/react-query
npx expo install @react-native-async-storage/async-storage
npx expo install expo-notifications
npx expo install expo-auth-session expo-secure-store
```

---

## Step-by-Step Implementation Plan

### Phase 1: Setup Monorepo (Week 1)

1. **Restructure Project**
   ```bash
   # Create monorepo structure
   mkdir -p apps packages

   # Move web app
   mv [current-files] apps/web/

   # Create mobile app
   cd apps && npx create-expo-app mobile --template expo-template-blank-typescript
   ```

2. **Configure Workspace**
   ```json
   // Root package.json
   {
     "workspaces": [
       "apps/*",
       "packages/*"
     ],
     "scripts": {
       "dev": "turbo dev",
       "build": "turbo build",
       "web": "cd apps/web && pnpm dev",
       "mobile": "cd apps/mobile && npx expo start"
     }
   }
   ```

3. **Setup Turborepo** (optional but recommended)
   ```json
   // turbo.json
   {
     "pipeline": {
       "dev": {
         "cache": false
       },
       "build": {
         "dependsOn": ["^build"],
         "outputs": [".next/**", "dist/**"]
       }
     }
   }
   ```

### Phase 2: Extract Shared Code (Week 2)

1. **Create `packages/types`**
   ```bash
   cd packages/types
   npm init -y

   # Copy types from apps/web/types/
   ```

2. **Create `packages/api`**
   ```bash
   cd packages/api
   npm init -y

   # Extract API calls from apps/web/lib/api.ts
   ```

3. **Create `packages/hooks`**
   ```bash
   cd packages/hooks
   npm init -y

   # Extract hooks like useAuth, useFeed
   ```

4. **Update apps to use shared packages**
   ```json
   // apps/web/package.json
   {
     "dependencies": {
       "@repo/types": "workspace:*",
       "@repo/api": "workspace:*",
       "@repo/hooks": "workspace:*"
     }
   }
   ```

### Phase 3: Build Mobile UI (Week 3-4)

1. **Setup Expo Router**
   ```bash
   cd apps/mobile
   npx expo install expo-router react-native-safe-area-context react-native-screens
   ```

   ```typescript
   // apps/mobile/app/_layout.tsx
   import { Stack } from 'expo-router';

   export default function Layout() {
     return <Stack />;
   }
   ```

2. **Create Screens**
   ```
   apps/mobile/app/
   ├── (tabs)/
   │   ├── _layout.tsx      # Tab navigator
   │   ├── index.tsx        # Feed screen
   │   ├── calendar.tsx     # Calendar screen
   │   └── profile.tsx      # Profile screen
   ├── auth/
   │   └── login.tsx        # Login screen
   └── _layout.tsx          # Root layout
   ```

3. **Build Components**
   ```tsx
   // apps/mobile/components/PostCard.tsx
   import { View, Image, Text } from 'react-native';
   import Animated, { FadeIn } from 'react-native-reanimated';
   import { Post } from '@repo/types';

   export const PostCard = ({ post }: { post: Post }) => {
     return (
       <Animated.View entering={FadeIn}>
         <Image source={{ uri: post.song.art }} />
         <Text>{post.song.name}</Text>
         <Text>{post.song.artist}</Text>
       </Animated.View>
     );
   };
   ```

4. **Use Shared Hooks**
   ```tsx
   // apps/mobile/app/(tabs)/index.tsx
   import { useFeed } from '@repo/hooks';
   import { PostCard } from '@/components/PostCard';

   export default function FeedScreen() {
     const { data, fetchNextPage } = useFeed();
     const posts = data?.pages.flatMap(page => page.posts) ?? [];

     return (
       <FlatList
         data={posts}
         renderItem={({ item }) => <PostCard post={item} />}
         onEndReached={fetchNextPage}
       />
     );
   }
   ```

### Phase 4: Implement Platform-Specific Features (Week 5)

1. **Spotify Auth (Mobile)**
   ```typescript
   // apps/mobile/lib/spotify-auth.ts
   import * as AuthSession from 'expo-auth-session';

   export const useSpotifyAuth = () => {
     const [request, response, promptAsync] = AuthSession.useAuthRequest(
       {
         clientId: SPOTIFY_CLIENT_ID,
         scopes: ['user-read-recently-played'],
         redirectUri: AuthSession.makeRedirectUri({ scheme: 'replay' })
       },
       { authorizationEndpoint: 'https://accounts.spotify.com/authorize' }
     );

     return { login: promptAsync };
   };
   ```

2. **Push Notifications**
   ```typescript
   // apps/mobile/lib/notifications.ts
   import * as Notifications from 'expo-notifications';

   export const scheduleRevealNotification = async () => {
     await Notifications.scheduleNotificationAsync({
       content: {
         title: "🎵 Time to Replay!",
         body: "Your song of the day is ready to be revealed"
       },
       trigger: {
         hour: 21,
         minute: 30,
         repeats: true
       }
     });
   };
   ```

3. **Animations**
   ```tsx
   // Replicate Framer Motion animations with Reanimated
   import Animated, {
     FadeIn,
     FadeOut,
     SlideInRight,
     ZoomIn
   } from 'react-native-reanimated';

   <Animated.View entering={FadeIn.duration(600)}>
     {/* Content */}
   </Animated.View>
   ```

---

## Mobile UI Design Adaptations

### Changes from Web to Mobile

1. **Navigation**
   - Bottom tabs instead of sidebar
   - Stack navigation for detail views
   - Swipe gestures for navigation

2. **Layout**
   - Full-screen cards (no max-width containers)
   - Larger touch targets (min 44x44 pts)
   - Bottom sheet modals instead of centered overlays

3. **Animations**
   - Native animations (60fps guaranteed)
   - Gesture-driven interactions
   - Page transitions

4. **Typography**
   - Larger base font sizes (16px minimum)
   - System fonts for better performance
   - Dynamic type support

### Example: Mobile Feed Screen

```tsx
// apps/mobile/app/(tabs)/index.tsx
import { FlatList, RefreshControl } from 'react-native';
import { useFeed } from '@repo/hooks';
import { PostCard } from '@/components/PostCard';
import { ThemedView } from '@/components/ThemedView';

export default function FeedScreen() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    refetch,
    isRefetching
  } = useFeed();

  const posts = data?.pages.flatMap(page => page.posts) ?? [];

  return (
    <ThemedView className="flex-1 bg-[#09090b]">
      <FlatList
        data={posts}
        renderItem={({ item }) => <PostCard post={item} />}
        keyExtractor={item => item.id}
        onEndReached={() => hasNextPage && fetchNextPage()}
        onEndReachedThreshold={0.5}
        refreshControl={
          <RefreshControl
            refreshing={isRefetching}
            onRefresh={refetch}
            tintColor="#6366f1"
          />
        }
        contentContainerClassName="p-4"
        showsVerticalScrollIndicator={false}
      />
    </ThemedView>
  );
}
```

---

## Development Workflow

### Running Both Apps

```bash
# Terminal 1: Web app
cd apps/web && pnpm dev

# Terminal 2: Mobile app
cd apps/mobile && npx expo start

# Or with Turbo
pnpm dev  # Runs both in parallel
```

### Testing
- **Web:** Use browser dev tools
- **Mobile:** Use Expo Go app or iOS Simulator/Android Emulator

### Deployment
- **Web:** Vercel (current)
- **Mobile:**
  - **iOS:** App Store via EAS Build
  - **Android:** Play Store via EAS Build
  - **OTA Updates:** Expo Updates

---

## Estimated Timeline

| Phase | Duration | Tasks |
|-------|----------|-------|
| Setup | 1 week | Monorepo, move code, configure |
| Extract Shared Code | 1 week | Create packages, update imports |
| Mobile UI | 2 weeks | Screens, components, navigation |
| Platform Features | 1 week | Auth, notifications, gestures |
| Polish & Testing | 1 week | Animations, performance, bugs |
| **Total** | **6 weeks** | Full mobile app with shared code |

---

## Alternative: Separate Repos (Not Recommended)

If you prefer separate repositories:

```
replay-web/          # Next.js app
replay-mobile/       # Expo app
replay-shared/       # npm package with shared code
```

**Pros:**
- Simpler Git history
- Independent deployment

**Cons:**
- Harder to keep in sync
- Need to publish shared package to npm
- More overhead

---

## Next Steps

1. **Decide on monorepo tool** (Turborepo or pnpm workspaces)
2. **Create `apps` and `packages` structure**
3. **Initialize Expo app**
4. **Start extracting shared code** (types, API, hooks)
5. **Build first mobile screen** (Feed)
6. **Test code sharing** and iterate

---

## Resources

- [Expo Documentation](https://docs.expo.dev/)
- [Expo Router](https://docs.expo.dev/router/introduction/)
- [React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/)
- [Turborepo Docs](https://turbo.build/repo/docs)
- [TanStack Query](https://tanstack.com/query/latest)
- [Expo EAS Build](https://docs.expo.dev/build/introduction/)

---

## Questions?

Common concerns addressed:

**Q: Can I use Tailwind on mobile?**
A: Yes! Use [NativeWind](https://www.nativewind.dev/) - Tailwind for React Native

**Q: How do I handle images?**
A: Use `expo-image` for optimized image loading

**Q: What about the calendar grid?**
A: Use `react-native-calendar-strip` or build custom with `FlatList`

**Q: Can I share the demo page code?**
A: Logic yes, UI needs mobile components (ScrollView, etc.)

