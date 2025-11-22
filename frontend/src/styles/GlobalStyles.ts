import { createGlobalStyle } from 'styled-components'
import { theme } from './theme'

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    font-family: ${theme.typography.fontFamily.primary};
    color: ${theme.colors.text.primary};
    background-color: ${theme.colors.background};
    line-height: ${theme.typography.lineHeight.normal};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow-x: hidden;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: ${theme.typography.fontFamily.heading};
    font-weight: ${theme.typography.fontWeight.bold};
    line-height: ${theme.typography.lineHeight.tight};
    color: ${theme.colors.text.primary};
    animation: slideInDown 0.5s ease-out;
  }

  h1 {
    font-size: ${theme.typography.fontSize['4xl']};
  }

  h2 {
    font-size: ${theme.typography.fontSize['3xl']};
  }

  h3 {
    font-size: ${theme.typography.fontSize['2xl']};
  }

  h4 {
    font-size: ${theme.typography.fontSize.xl};
  }

  h5, h6 {
    font-size: ${theme.typography.fontSize.lg};
  }

  p {
    margin-bottom: ${theme.spacing.md};
  }

  a {
    color: ${theme.colors.primary};
    text-decoration: none;
    transition: color ${theme.transitions.base};

    &:hover {
      color: ${theme.colors.secondary};
    }

    &:focus-visible {
      outline: 2px solid ${theme.colors.primary};
      outline-offset: 2px;
    }

    &:active {
      transform: scale(0.98);
    }
  }

  button {
    font-family: ${theme.typography.fontFamily.primary};
    cursor: pointer;
    border: none;
    transition: all ${theme.transitions.base};
    -webkit-tap-highlight-color: transparent;

    &:active {
      transform: scale(0.98);
    }

    &:focus-visible {
      outline: 2px solid ${theme.colors.primary};
      outline-offset: 2px;
    }
  }

  input, textarea, select {
    font-family: ${theme.typography.fontFamily.primary};
    border: 1px solid ${theme.colors.border};
    border-radius: ${theme.borderRadius.md};
    padding: ${theme.spacing.md};
    transition: all ${theme.transitions.base};
    -webkit-appearance: none;
    appearance: none;

    &:focus {
      outline: none;
      border-color: ${theme.colors.primary};
      box-shadow: 0 0 0 3px rgba(196, 30, 58, 0.1);
    }

    &:disabled {
      background-color: ${theme.colors.surface};
      cursor: not-allowed;
    }
  }

  /* Scrollbar styling */
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  ::-webkit-scrollbar-track {
    background: ${theme.colors.surface};
  }

  ::-webkit-scrollbar-thumb {
    background: ${theme.colors.primary};
    border-radius: ${theme.borderRadius.full};
    transition: background ${theme.transitions.base};

    &:hover {
      background: ${theme.colors.secondary};
    }
  }

  /* Animations */
  @keyframes slideInDown {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  /* Media query breakpoints */
  @media (max-width: ${theme.breakpoints.tablet}) {
    h1 {
      font-size: ${theme.typography.fontSize['3xl']};
    }

    h2 {
      font-size: ${theme.typography.fontSize['2xl']};
    }

    h3 {
      font-size: ${theme.typography.fontSize.xl};
    }

    body {
      font-size: ${theme.typography.fontSize.base};
    }
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    h1 {
      font-size: ${theme.typography.fontSize['2xl']};
    }

    h2 {
      font-size: ${theme.typography.fontSize.xl};
    }

    h3 {
      font-size: ${theme.typography.fontSize.lg};
    }

    body {
      font-size: ${theme.typography.fontSize.sm};
    }

    input, textarea, select {
      font-size: 16px;
    }
  }
`
