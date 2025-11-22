/**
 * Button component with TVK styling
 */

import React from 'react'
import styled from 'styled-components'
import { theme } from '@styles/theme'

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  fullWidth?: boolean
  loading?: boolean
  children: React.ReactNode
}

const StyledButton = styled.button<Omit<ButtonProps, 'children'>>`
  font-weight: ${theme.typography.fontWeight.semibold};
  border-radius: ${theme.borderRadius.lg};
  border: none;
  cursor: pointer;
  transition: all ${theme.transitions.base};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing.sm};
  white-space: nowrap;
  text-decoration: none;
  text-align: center;
  width: ${(props) => (props.fullWidth ? '100%' : 'auto')};
  min-height: 44px;

  /* Size variants */
  ${(props) => {
    switch (props.size || 'md') {
      case 'sm':
        return `
          padding: ${theme.spacing.sm} ${theme.spacing.md};
          font-size: ${theme.typography.fontSize.sm};
          min-height: 40px;
        `
      case 'lg':
        return `
          padding: ${theme.spacing.lg} ${theme.spacing.xl};
          font-size: ${theme.typography.fontSize.lg};
          min-height: 48px;
        `
      case 'md':
      default:
        return `
          padding: ${theme.spacing.md} ${theme.spacing.lg};
          font-size: ${theme.typography.fontSize.base};
        `
    }
  }}

  /* Color variants */
  ${(props) => {
    switch (props.variant || 'primary') {
      case 'primary':
        return `
          background-color: ${theme.colors.primary};
          color: ${theme.colors.text.inverse};

          &:hover:not(:disabled) {
            background-color: #a01829;
            box-shadow: ${theme.shadows.lg};
            transform: translateY(-2px);
          }

          &:active:not(:disabled) {
            transform: translateY(0);
          }
        `
      case 'secondary':
        return `
          background-color: ${theme.colors.secondary};
          color: ${theme.colors.text.primary};

          &:hover:not(:disabled) {
            background-color: #ffed4e;
            box-shadow: ${theme.shadows.lg};
            transform: translateY(-2px);
          }

          &:active:not(:disabled) {
            transform: translateY(0);
          }
        `
      case 'outline':
        return `
          background-color: transparent;
          color: ${theme.colors.primary};
          border: 2px solid ${theme.colors.primary};

          &:hover:not(:disabled) {
            background-color: rgba(196, 30, 58, 0.05);
            border-color: #a01829;
          }
        `
      case 'ghost':
        return `
          background-color: transparent;
          color: ${theme.colors.primary};

          &:hover:not(:disabled) {
            background-color: rgba(196, 30, 58, 0.05);
          }
        `
      default:
        return ''
    }
  }}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:focus-visible {
    outline: 2px solid ${theme.colors.primary};
    outline-offset: 2px;
  }

  @media (max-width: ${theme.breakpoints.tablet}) {
    ${(props) => {
      if (props.size === 'lg') {
        return `
          padding: ${theme.spacing.md} ${theme.spacing.lg};
          font-size: ${theme.typography.fontSize.base};
          min-height: 44px;
        `
      }
      return ''
    }}
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: ${theme.spacing.sm} ${theme.spacing.md};
    font-size: ${theme.typography.fontSize.sm};
    min-height: 40px;
  }
`

/**
 * Button Component
 * @example
 * <Button variant="primary" size="md">Click me</Button>
 * <Button variant="outline" fullWidth>Wide button</Button>
 */
export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  loading = false,
  disabled = false,
  children,
  ...props
}) => {
  return (
    <StyledButton
      variant={variant}
      size={size}
      fullWidth={fullWidth}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? '...' : children}
    </StyledButton>
  )
}
