## Design System Overview

A comprehensive analytics dashboard featuring a dark theme that's easy on the eyes during long usage sessions. Includes data visualization, KPI cards, and responsive sidebar navigation.

## Design Philosophy

- **Dark first**: Designed for dark mode, not adapted to it
- **Data density**: Information-rich without feeling cluttered
- **Hierarchy through color**: Use color sparingly to highlight important data
- **Consistent spacing**: 8px grid system throughout

## Color Palette (Dark)

- Background Primary: `#0F1115` (Deep black-blue)
- Background Secondary: `#161922` (Elevated surfaces)
- Background Tertiary: `#1E2129` (Cards, inputs)
- Border: `#2A2D35` (Subtle dividers)
- Text Primary: `#F0F2F5` (Near white)
- Text Secondary: `#8B919C` (Muted gray)
- Accent Primary: `#6366F1` (Indigo)
- Accent Success: `#22C55E` (Green)
- Accent Warning: `#F59E0B` (Amber)
- Accent Danger: `#EF4444` (Red)

## Typography

- **Font**: Inter
- **Scale**: 14px base
- **Weights**: 400 (body), 500 (labels), 600 (headings), 700 (numbers)

## Layout Structure

### Sidebar (240px fixed)

- Logo at top
- Main navigation with icons
- Collapsible sections
- User profile at bottom
- Collapses to icon-only (72px) on smaller screens

### Main Content Area

- Header with search, notifications, user menu
- Page title and actions
- Content grid (adjusts based on screen)

## Components

### KPI Cards (Top Row)

- 4-column grid on desktop
- Icon + label + value + trend indicator
- Sparkline mini-chart (optional)
- Hover: subtle lift effect

### Main Chart (60% width)

- Line or area chart
- Time range selector (7d, 30d, 90d, 1y)
- Legend toggleable
- Tooltip on hover

### Data Table (40% width)

- Sortable columns
- Pagination or infinite scroll
- Row hover highlight
- Status badges

### Activity Feed (Optional)

- Real-time updates
- User avatars
- Timestamps
- Action buttons

## Interactions

- Sidebar toggle with smooth animation (300ms ease)
- Cards lift on hover (transform: translateY(-2px))
- Table rows highlight on hover
- Chart tooltips follow cursor
- Loading states with skeleton screens

## Responsive Behavior

- **Desktop**: Full sidebar + 3-column grid
- **Tablet**: Collapsed sidebar + 2-column grid
- **Mobile**: Hidden sidebar (hamburger menu) + 1-column stack

## Data Visualization

- Use Chart.js or Recharts
- Consistent color mapping for data series
- Grid lines: subtle, dashed
- Axis labels: text-secondary color

## States

- **Empty**: Illustration + helpful message
- **Loading**: Skeleton screens matching content structure
- **Error**: Inline error with retry action
- **No data**: Different from empty - show "No data for selected period"

## Performance Considerations

- Lazy load charts
- Virtualize long lists
- Debounce search/filter inputs
- Use CSS transforms for animations (GPU accelerated)
