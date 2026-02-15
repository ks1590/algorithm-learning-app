export const AppColors = {
  // Base Colors
  background: '#FFF8E7', // Cream / Light Beige
  foreground: '#000000',
  white: '#ffffff',
  black: '#000000',

  // Primary Palette
  primary: '#FF66C4', // Hot Pink
  secondary: '#FFD23F', // Pop Yellow
  accent: '#3DCCC7', // Teal
  muted: '#8E9DFF', // Periwinkle
  destructive: '#FF6B6B',
  
  // Specific UI Elements
  descriptionBox: {
    background: '#d9f99d', // Lime Green (Tailwind lime-200 equivalent)
    border: '#000000',
  },

  tree: {
    node: {
        active: {
            fill: '#FFD23F',
            stroke: '#f3c326',
        },
        visited: {
            fill: '#C689D8',
            stroke: '#9333EA',
        },
        default: {
            fill: '#ffffff',
            stroke: '#000000',
        }
    },
    edge: {
        stroke: 'gray',
    }
  }
} as const;
