# Klingende Klavierschule

A Next.js-based interactive piano learning platform that provides educational content and exercises for piano students. The application integrates with Contentful CMS for content management and includes audio playback capabilities for musical exercises.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Quickstart](#quickstart)
- [Environment Configuration](#environment-configuration)
- [Development](#development)
- [Building for Production](#building-for-production)
- [Project Structure](#project-structure)
- [Key Features](#key-features)
- [Technology Stack](#technology-stack)
- [Architecture Overview](#architecture-overview)
- [Content Management](#content-management)
- [Development Guide](#development-guide)
- [Code Quality](#code-quality)
- [Troubleshooting](#troubleshooting)

## Prerequisites

- **Node.js** (version 14 or higher)
- **npm** Node package manager
- **Contentful account** with a space and API tokens

## Quickstart

1. **Clone the repository**

   ```bash
   git clone https://github.com/carodanner/Die_klingende_Klavierschule.git
   cd klingende-klavierschule
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables** (see [Environment Configuration](#environment-configuration))

4. **Start development server**
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:3000` with Turbo mode enabled for faster development.

## Environment Configuration

Create a `.env.local` file in the project root based on the provided `env.template`:

```bash
cp env.template .env.local
```

### Required Environment Variables

| Variable                   | Description                   | Example        |
| -------------------------- | ----------------------------- | -------------- |
| `CONTENTFUL_SPACE_ID`      | Your Contentful space ID      | `abc123def456` |
| `CONTENTFUL_ACCESS_TOKEN`  | Contentful delivery API token | `abc123def456` |
| `CONTENTFUL_PREVIEW_TOKEN` | Contentful preview API token  | `abc123def456` |
| `CONTENTFUL_USE_PREVIEW`   | Enable preview mode           | `false`        |

### Optional Environment Variables

| Variable                        | Description             | Default               |
| ------------------------------- | ----------------------- | --------------------- |
| `CONTENTFUL_CACHE_JSON`         | Enable JSON caching     | `false`               |
| `CONTENTFUL_CACHE_JSON_ROOT`    | Cache directory         | `./.contentful-cache` |
| `CONTENTFUL_USE_CACHED_RESULTS` | Use cached results      | `false`               |
| `NEXT_PUBLIC_FATHOM_ENABLED`    | Enable Fathom analytics | `false`               |
| `NEXT_PUBLIC_FATHOM_ID`         | Fathom site ID          | `ID`                  |

## Development

### Start Development Server

```bash
npm run dev
```

### Available Scripts

| Script                 | Description                          |
| ---------------------- | ------------------------------------ |
| `npm run dev`          | Start development server with Turbo  |
| `npm run build`        | Build the application for production |
| `npm run start`        | Start production server              |
| `npm run lint`         | Run ESLint for code quality checks   |
| `npm run format`       | Format code with Prettier            |
| `npm run format:check` | Check code formatting                |
| `npm run prepare`      | Set up Git hooks with Husky          |

### Development Features

- **Hot Reload**: Automatic page refresh on file changes
- **TypeScript**: Full type checking and IntelliSense
- **ESLint**: Code quality and style enforcement
- **Prettier**: Automatic code formatting
- **Git Hooks**: Pre-commit linting and formatting

## Building for Production

### Build the Application

```bash
npm run build=
```

### Start Production Server

```bash
npm run start
```

### Build Output

The build process creates an optimized production bundle in the `.next` directory with:

- Static generation where possible
- Server-side rendering for dynamic content
- Optimized images and assets
- Code splitting for better performance

## Project Structure

```
klingende-klavierschule/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── aufgabe/           # Task/exercise pages
│   │   ├── aufgabenListe/    # Task list pages
│   │   ├── globals.css        # Global styles
│   │   └── layout.tsx         # Root layout
│   ├── components/            # React components
│   │   ├── ui/                # Reusable UI components
│   │   ├── GameView.tsx       # Game interface
│   │   ├── TaskView.tsx       # Task display
│   │   └── ...
│   ├── contexts/              # React contexts
│   │   └── AudioContext.tsx   # Audio management
│   ├── hooks/                 # Custom React hooks
│   │   └── useDingSound.ts    # Audio hook
│   └── lib/                   # Utility libraries
│       ├── contentful/        # Contentful integration
│       └── utils.ts           # Helper functions
├── examples/                  # Example content and media
├── public/                   # Static assets
├── components.json            # shadcn/ui configuration
├── next.config.ts            # Next.js configuration
├── tailwind.config.js         # Tailwind CSS configuration
├── tsconfig.json             # TypeScript configuration
└── package.json              # Dependencies and scripts
```

## Key Features

### 🎹 Interactive Piano Learning

- **Audio System**: Context-based audio playback with automatic stopping and sequential queuing
- **Game Types**: Three distinct game types (Einfach, Sequenz, Sammlung) with different interaction patterns
- **Interactive Areas**: Coordinate-based clickable regions overlaid on educational images
- **Audio Feedback**: Success sounds, error sounds, and ding feedback for user actions

### 📚 Content Management

- **Contentful CMS**: Full headless CMS integration with typed content models
- **Static Generation**: Pre-rendered pages for optimal performance
- **Preview Mode**: Draft content preview capabilities
- **Caching**: JSON-based caching system for improved performance

## Technology Stack

### Frontend

- **Next.js 15.3.3** - React framework with App Router
- **React 19.0.0** - UI library
- **TypeScript 5** - Type safety
- **Tailwind CSS 4.1.14** - Utility-first CSS framework

### Content Management

- **Contentful** - Headless CMS

### Analytics

- **Fathom Analytics** - Privacy-focused analytics

## Architecture Overview

### Core Components

The application is built around three main architectural layers:

#### 1. **Content Layer (Contentful CMS)**

- **Content Types**: Tasks, Games, Questions, and ClickAreas
- **Asset Management**: Audio files and images with CDN delivery
- **Caching**: JSON-based file system caching for performance
- **Preview Mode**: Draft content preview capabilities

#### 2. **Application Layer (Next.js)**

- **Static Generation**: Pre-rendered pages for all tasks
- **Dynamic Routing**: `[slug]` routes for individual tasks
- **Server Components**: Server-side rendering for optimal performance
- **Type Safety**: Full TypeScript integration with Contentful types

#### 3. **Interactive Layer (React)**

- **Audio Management**: Global audio context with single-instance control
- **Game Logic**: Three game types with different interaction patterns
- **Click Areas**: Coordinate-based interactive overlays
- **State Management**: Complex game state and progress tracking

### Content Model

```typescript
// Main content structure
type Task = {
  id: string;
  name: string;
  slug: string;
  image?: AssetWrapper;
  imageHeight?: number;
  imageWidth?: number;
  simpleInteractions: ClickArea[];
  games: Game[];
};

type Game = {
  id: string;
  name: string;
  type: "Einfach" | "Sequenz" | "Sammlung";
  start: ClickArea;
  questions: Question[];
  answerAreas: ClickArea[];
  successSound?: AssetWrapper;
  errorSounds: AssetWrapper[];
  correctAnswerSounds: AssetWrapper[];
};
```

### Game Types

- **Einfach (Simple)**: Single-answer questions with immediate feedback
- **Sequenz (Sequence)**: Multi-step answers requiring specific order
- **Sammlung (Collection)**: Multiple correct answers in any order

## Content Management

### Contentful Integration

The application uses Contentful as a headless CMS with the following content types:

- **Task (aufgabe)**: Main educational exercises with background images
- **Game (trueFalseGame)**: Interactive games with three types (Einfach, Sequenz, Sammlung)
- **Question (question)**: Audio questions with correct answer mappings
- **ClickArea (clickArea)**: Interactive regions with coordinates and audio

### API Structure

```
src/lib/contentful/
├── client.ts              # Contentful client with caching
├── apis/
│   ├── tasks-api.ts       # Task management
│   ├── game-api.ts        # Game logic
│   ├── question-api.ts    # Question handling
│   ├── clickArea-api.ts   # Interactive areas
│   └── asset-api.ts       # Media assets
```

### Caching

- **JSON Caching**: File system caching with SHA1 hashing
- **Configurable**: Enable/disable caching via environment variables
- **Performance**: Reduces API calls and improves load times

## Development Guide

### Adding New Content

1. **Create Content in Contentful**:
   - Add new Task entries with background images
   - Create Games with appropriate type (Einfach, Sequenz, Sammlung)
   - Define Questions with audio files
   - Set up ClickAreas with coordinates and sounds

2. **Content Structure**:
   ```
   Task (aufgabe)
   ├── Background Image
   ├── Simple Interactions (ClickAreas)
   └── Games
       ├── Start Area
       ├── Questions (with audio)
       └── Answer Areas
   ```

### Extending the Application

#### **Adding New Game Types**

1. Update the `Game` type in `src/lib/contentful/apis/game-api.ts`
2. Add logic in `src/components/GameView.tsx`
3. Update Contentful content type if needed

#### **Custom Audio Features**

- Audio files are managed through Contentful assets
- Use the `AudioContext` for global audio management
- Implement custom hooks for specific audio patterns

#### **New Interactive Elements**

- ClickAreas use coordinate-based positioning
- Add new interaction types by extending the `ClickArea` component
- Use the preview mode to debug positioning

## Code Quality

- **ESLint**: Configured with Next.js and TypeScript rules
- **Prettier**: Consistent code formatting
- **Git Hooks**: Automated pre-commit checks with Husky
- **TypeScript**: Strict type checking with custom Contentful types
- **Component Structure**: Organized by feature and reusability

## Troubleshooting

### Common Issues

1. **Environment Variables**: Ensure `.env.local` exists with all required Contentful credentials
2. **Contentful Connection**: Verify space ID and access tokens are correct
3. **Build Failures**: Clear Next.js cache with `rm -rf .next` and reinstall dependencies
4. **Audio Issues**: Check browser permissions and audio file formats
5. **TypeScript Errors**: Run `npx tsc --noEmit` to check for type issues

### Performance Tips

- Enable Contentful caching: `CONTENTFUL_CACHE_JSON=true`
- Use static generation for optimal performance
- Optimize images and audio files

### Getting Help

- Check console logs for error messages
- Verify all environment variables are set
- Ensure Contentful content is properly configured
- Refer to [Next.js](https://nextjs.org/docs) and [Contentful](https://www.contentful.com/developers/docs/) documentation

### License

This project is licensed under the MIT License. See the LICENSE file for more details.

### Deployment

This project is deployed using **Vercel** with automatic deployments:

- **Production:** [klingende-klavierschule.de](https://klingende-klavierschule.de)
- **Preview (dev branch):** [preview.klingende-klavierschule.de](https://preview.klingende-klavierschule.de)

#### Vercel Configuration

- **Automatic Deployments**: Connected to GitHub repository
- **Preview Deployments**: Automatic preview deployment for development branch
- **Environment Variables**: Configured in Vercel dashboard
- **Build Command**: `npm run build`
- **Output Directory**: `.next`
