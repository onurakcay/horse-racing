# Horse Racing App 🐎

[Try it](https://race.onurakcay.dev/)


A comprehensive horse racing simulation application built with Vue 3, TypeScript, and Vuex. Features 6 rounds of racing with 20 unique horses, complete with animations, mobile responsiveness, and comprehensive testing.

## Features

- **6-Round Racing System**: Different distances from 1200m to 2200m
- **20 Unique Horses**: Each with distinct names, colors, and conditions
- **Real-time Race Animation**: Smooth horse movement with live tracking
- **Mobile Responsive Design**: Optimized for both desktop and mobile devices
- **Floating Action Buttons**: Mobile-specific navigation
- **Bottom Sheet Components**: Mobile-friendly content display
- **Complete Program & Results**: Track all races and standings
- **TypeScript Support**: Full type safety throughout the application
- **Comprehensive Testing**: Unit tests and E2E test coverage

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Project Setup

```sh
npm install
```

### Development Commands

```sh
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Type checking
npm run type-check

# Linting
npm run lint

# Code formatting
npm run format
```

### Testing Commands

```sh
# Run unit tests
npm run test:unit

# Run all E2E tests in headless mode
npm run test:e2e

# Open Cypress test runner for development
npm run test:e2e:dev

# Run E2E tests in Chrome browser
npm run test:e2e:chrome

# Run mobile-specific E2E tests
npm run test:e2e:mobile

# Run performance and edge case tests
npm run test:e2e:performance

# Run all tests (unit + E2E)
npm run test:all
```

### Test Coverage

The application includes comprehensive test suites:

- **Unit Tests**: Component and store testing with Vitest
- **E2E Tests**: Complete user flow testing with Cypress
- **Mobile Tests**: Touch interactions and responsive design testing
- **Performance Tests**: Load times, memory usage, and edge cases
- **Accessibility Tests**: Keyboard navigation and screen reader support

## Tech Stack

- **Vue 3**: Composition API with TypeScript
- **Vuex 4**: State management with typed store
- **Vite**: Build tool and development server
- **TypeScript**: Type safety and IDE support
- **Cypress**: End-to-end testing framework
- **Vitest**: Unit testing framework
- **CSS Grid/Flexbox**: Responsive layout system

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Responsive design from 320px to 1920px+ widths

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Start development server: `npm run dev`
4. Open http://localhost:5173 in your browser
5. Click "Generate Program" to create races
6. Click "Start Race" to begin the first race
7. Watch the horses compete and advance through all 6 rounds!

## Mobile Usage

On mobile devices, use the floating action buttons:

- 🐎 **Horses**: View all horses and their conditions
- 📋 **Program**: Check upcoming races and rounds
- 🏆 **Results**: View completed race results

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests: `npm run test:all`
5. Submit a pull request

## License

This project is open source and available under the MIT License.

```sh
npm run build
npm run test:e2e
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
