# Beyond System

A library of React components using Tailwind CSS and Material UI components.

## Installation

### Local Installation

To use this library in another local project, you can use `npm link` or install it via file path.

**Method 1: File Path (Recommended for local dev)**

In your consuming project:

```bash
npm install "path/to/Beyond System Project"
```

**Method 2: NPM Link**

In this project directory:

```bash
npm link
```

In your consuming project:

```bash
npm link beyond-system
```

### Usage

1. Import the CSS in your main entry file (e.g., `main.tsx` or `App.tsx`):

```tsx
import 'beyond-system/style.css';
```

2. Import and use components:

```tsx
import { Button, Input } from 'beyond-system';

function App() {
  return (
    <div>
      <Input placeholder="Enter something" />
      <Button variant="primary">Submit</Button>
    </div>
  );
}
```

## Development

- `npm run dev`: Start dev server
- `npm run build`: Build the library
- `npm run storybook`: Run Storybook for component development
