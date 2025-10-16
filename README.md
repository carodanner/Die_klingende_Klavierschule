# Klingende Klavierschule

A Next.js-based interactive piano learning platform that provides educational content and exercises for piano students. The application integrates with Contentful CMS for content management and includes audio playback capabilities for musical exercises.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Quickstart](#quickstart)
- [Environment Configuration](#environment-configuration)
- [Building for Production](#building-for-production)
- [Technology Stack](#technology-stack)
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

## Building for Production

### Build the Application

```bash
npm run build
```

### Start Production Server

```bash
npm run start
```

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

## Troubleshooting

### Common Issues

1. **Environment Variables**: Ensure `.env.local` exists with all required Contentful credentials
2. **Contentful Connection**: Verify space ID and access tokens are correct
3. **Build Failures**: Clear Next.js cache with `rm -rf .next` and reinstall dependencies
4. **Audio Issues**: Check browser permissions and audio file formats
5. **TypeScript Errors**: Run `npx tsc --noEmit` to check for type issues

### License

This project is licensed under the MIT License. See the LICENSE file for more details.
