# KoreanHwa - Korean Learning Platform

A modern, interactive Korean learning platform built with React, Vite, and Tailwind CSS. Designed to provide an engaging and effective learning experience for Vietnamese students studying Korean.

## 🚀 Features

- **Interactive Lessons**: Learn Korean through interactive lessons with images, audio, and video
- **Achievement System**: Earn badges and scores when completing lessons and challenges
- **Learning Community**: Connect with other learners and share learning experiences
- **Effective Methods**: Apply scientific learning methods for long-term retention
- **Progress Tracking**: Monitor your learning progress with detailed analytics
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices

## 🛠️ Technology Stack

- **Frontend**: React 19, Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **UI Components**: Headless UI
- **State Management**: React Hooks (useState, useEffect, custom hooks)

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/koreanhwa.git
   cd koreanhwa
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` (or the port shown in your terminal)

## 🏗️ Project Structure

```
koreanhwa/
├── src/
│   ├── components/
│   │   ├── common/           # Reusable UI components
│   │   │   ├── Button.jsx
│   │   │   ├── Input.jsx
│   │   │   ├── Card.jsx
│   │   │   ├── Badge.jsx
│   │   │   ├── Modal.jsx
│   │   │   ├── Loading.jsx
│   │   │   ├── ProgressBar.jsx
│   │   │   ├── Avatar.jsx
│   │   │   ├── Tooltip.jsx
│   │   │   └── Dashboard.jsx
│   │   └── layout/           # Layout components
│   │       ├── Header.jsx
│   │       ├── Footer.jsx
│   │       └── Layout.jsx
│   ├── pages/                # Page components
│   │   ├── Home.jsx
│   │   ├── Dashboard.jsx
│   │   └── Components.jsx
│   ├── hooks/                # Custom React hooks
│   │   ├── useLocalStorage.js
│   │   └── useAuth.js
│   ├── utils/                # Utility functions
│   │   └── constants.js
│   ├── App.jsx              # Main app component
│   └── index.css            # Global styles
├── public/                  # Static assets
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

## 🎨 Component Library

### Common Components

#### Button
```jsx
import Button from './components/common/Button';

<Button variant="primary" size="md" onClick={handleClick}>
  Click me
</Button>
```

**Variants**: `primary`, `secondary`, `outline`, `ghost`, `danger`, `success`
**Sizes**: `sm`, `md`, `lg`, `xl`

#### Input
```jsx
import Input from './components/common/Input';

<Input 
  label="Email"
  placeholder="Enter your email"
  type="email"
  error="Invalid email"
/>
```

#### Card
```jsx
import Card from './components/common/Card';

<Card variant="elevated" className="p-6">
  Card content
</Card>
```

**Variants**: `default`, `elevated`, `outlined`, `filled`, `primary`, `success`, `warning`, `danger`

#### Badge
```jsx
import Badge from './components/common/Badge';

<Badge variant="success" size="md">
  Completed
</Badge>
```

**Variants**: `default`, `primary`, `success`, `warning`, `danger`, `info`, `purple`, `pink`
**Sizes**: `sm`, `md`, `lg`

#### Modal
```jsx
import Modal from './components/common/Modal';

<Modal isOpen={isOpen} onClose={onClose} title="Modal Title">
  Modal content
</Modal>
```

#### Loading
```jsx
import Loading from './components/common/Loading';

<Loading size="lg" text="Loading..." />
```

**Variants**: `spinner`, `dots`, `pulse`
**Sizes**: `sm`, `md`, `lg`, `xl`

#### ProgressBar
```jsx
import ProgressBar from './components/common/ProgressBar';

<ProgressBar progress={75} variant="success" showLabel />
```

#### Avatar
```jsx
import Avatar from './components/common/Avatar';

<Avatar src="/path/to/image.jpg" alt="User" size="lg" status="online" />
```

**Sizes**: `xs`, `sm`, `md`, `lg`, `xl`, `2xl`
**Status**: `online`, `offline`, `away`, `busy`

#### Tooltip
```jsx
import Tooltip from './components/common/Tooltip';

<Tooltip content="This is a tooltip" position="top">
  <button>Hover me</button>
</Tooltip>
```

**Positions**: `top`, `bottom`, `left`, `right`

### Layout Components

#### Header
```jsx
import Header from './components/layout/Header';

<Header />
```

#### Footer
```jsx
import Footer from './components/layout/Footer';

<Footer />
```

#### Layout
```jsx
import Layout from './components/layout/Layout';

<Layout>
  <YourPageContent />
</Layout>
```

## 📱 Available Pages

- **Home** (`/`) - Landing page with hero section, features, and call-to-action
- **Dashboard** (`/dashboard`) - User dashboard with progress tracking and statistics
- **Components** (`/components`) - Component showcase and documentation
- **Courses** (`/courses`) - Course listing and management (under development)
- **Lessons** (`/lessons`) - Lesson content and practice (under development)
- **Achievements** (`/achievements`) - User achievements and badges (under development)
- **Profile** (`/profile`) - User profile and settings (under development)

## 🎯 Usage Examples

### Creating a new page
```jsx
import React from 'react';
import Layout from './components/layout/Layout';
import { Card, Button } from './components/common';

const MyPage = () => {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Card className="p-6">
          <h1 className="text-2xl font-bold mb-4">My Page</h1>
          <Button variant="primary">Action Button</Button>
        </Card>
      </div>
    </Layout>
  );
};

export default MyPage;
```

### Using custom hooks
```jsx
import { useLocalStorage, useAuth } from './hooks';

const MyComponent = () => {
  const [theme, setTheme] = useLocalStorage('theme', 'light');
  const { user, login, logout } = useAuth();
  
  return (
    <div>
      <p>Current theme: {theme}</p>
      <p>User: {user?.name}</p>
    </div>
  );
};
```

## 📜 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🎨 Customization

### Tailwind Configuration
The project uses Tailwind CSS with custom configuration. You can modify `tailwind.config.js` to:

- Add custom colors
- Extend spacing
- Add custom fonts
- Configure plugins

### Theme Customization
```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          // ... more shades
          900: '#1e3a8a',
        },
      },
    },
  },
}
```

## 📱 Responsive Design

The platform is fully responsive with breakpoints:
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

All components are designed to work seamlessly across all device sizes.

## 🚀 Development Guidelines

### Code Style
- Use functional components with hooks
- Follow React best practices
- Use TypeScript for better type safety (optional)
- Write meaningful component and variable names
- Add comments for complex logic

### Component Structure
```jsx
import React from 'react';
import PropTypes from 'prop-types';

const ComponentName = ({ prop1, prop2, children }) => {
  // Component logic here
  
  return (
    <div className="component-classes">
      {children}
    </div>
  );
};

ComponentName.propTypes = {
  prop1: PropTypes.string.isRequired,
  prop2: PropTypes.number,
  children: PropTypes.node,
};

export default ComponentName;
```

### State Management
- Use React hooks for local state
- Use Context API for global state (if needed)
- Consider Redux for complex state management

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Setup
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run linting
npm run lint

# Build for production
npm run build
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact

- **Email**: contact@koreanhwa.com
- **Website**: https://koreanhwa.com
- **GitHub**: https://github.com/your-username/koreanhwa

## 🙏 Acknowledgments

- React team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- Vite for the fast build tool
- All contributors and supporters

---

Made with ❤️ for Korean learners in Vietnam
