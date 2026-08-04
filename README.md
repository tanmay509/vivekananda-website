# VCC Computer Training Center Website

A modern, fully responsive single-page website for a Computer Training Center, built with React.js, pure CSS3, and smooth scrolling navigation.

## Features

- **Sticky responsive navbar** with hamburger menu for mobile
- **Hero section** with animated tech-themed illustration
- **About Us** with mission, vision, and values
- **Courses grid** with hover lift/shadow card effects
- **Faculty showcase** with profile cards
- **Student Corner** with notice board, downloads, and success stories
- **Location** with Google Maps embed and operating hours
- **Contact form** with HTML5 validation
- **Mobile-first design** using CSS Flexbox and Grid
- **Pure CSS3** — no external CSS frameworks

## Tech Stack

- React 19 (Functional Components & Hooks)
- Vite 8
- Pure CSS3 with CSS Custom Properties
- ES6+ JavaScript

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── Navbar/          # Sticky navigation with mobile menu
│   ├── Footer/          # Footer with links and social icons
│   ├── Hero/            # Hero section with CTA
│   ├── About/           # About Us section
│   ├── Courses/         # Course grid + CourseCard
│   ├── Faculty/         # Faculty grid + FacultyCard
│   ├── StudentCorner/   # Announcements, resources, stories
│   ├── Location/        # Map embed and address
│   └── Contact/         # Contact form + info
├── data/
│   └── siteData.js      # Centralized content (courses, faculty, etc.)
├── styles/
│   ├── variables.css    # CSS custom properties / design tokens
│   └── global.css       # Reset, utilities, shared styles
├── App.jsx
└── main.jsx
```

## Customization

Edit `src/data/siteData.js` to update:
- Navigation links
- Course offerings
- Faculty members
- Announcements and resources
- Contact information
- Social media links

## License

Private project — VCC Computer Training Center.
