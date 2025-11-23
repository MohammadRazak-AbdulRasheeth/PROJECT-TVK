/**
 * Theme configuration for TVK Canada
 * Defines color palette, spacing, breakpoints, and other design tokens
 */
export const theme = {
  colors: {
    primary: '#8B0000', // Deep Professional Red
    primaryLight: '#A52A2A', // Lighter shade for hover states
    primaryDark: '#6B0000', // Darker shade for depth
    secondary: '#C9A961', // Sophisticated Gold
    accent: '#2C3E50', // Navy Blue for contrast
    background: '#FAFAFA', // Soft off-white
    surface: '#FFFFFF',
    surfaceElevated: '#F8F9FA', // Slightly elevated surfaces
    text: {
      primary: '#1A202C', // Rich dark blue-gray
      secondary: '#4A5568', // Medium gray
      light: '#718096', // Light gray
      inverse: '#FFFFFF',
    },
    border: '#E2E8F0',
    borderLight: '#F0F4F8',
    success: '#38A169',
    error: '#E53E3E',
    warning: '#DD6B20',
    info: '#3182CE',
    gradient: {
      primary: 'linear-gradient(135deg, #8B0000 0%, #A52A2A 50%, #C9A961 100%)',
      secondary: 'linear-gradient(135deg, #2C3E50 0%, #34495E 100%)',
      subtle: 'linear-gradient(180deg, #FFFFFF 0%, #F8F9FA 100%)',
    },
  },
    typography: {
    fontFamily: "'Roboto', sans-serif",
    fontSize: {
      xs: '12px',
        sm: '14px',
        base: '16px',
        lg: '20px',
        xl: '24px',
        '2xl': '30px',
        '3xl': '36px',
        '4xl': '48px',
    },
    fontWeight: {
        light: 300,
        regular: 400,
        semibold: 600,
        bold: 700,
        extrabold: 800,
    },
    lineHeight: {
        normal: 1.5,
        relaxed: 1.75,
        tight: 1.25,
    },  
    },
    spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    xxl: '48px',
    xxxl: '64px',
    },
    breakpoints: {
    mobile: '480px',
    tablet: '768px',
    desktop: '1024px',
    widescreen: '1280px',
    },
    borderRadius: { 
    sm: '4px',
    md: '8px',
    lg: '16px',
    full: '9999px',
    },
    shadows: {
    sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px rgba(0, 0, 0, 0.15)',
    xl: '0 20px 25px rgba(0, 0, 0, 0.2)',
    },
    transitions: {
    base: 'all 0.3s ease-in-out',
    fast: 'all 0.15s ease-in-out',
    slow: 'all 0.5s ease-in-out',
    },
}