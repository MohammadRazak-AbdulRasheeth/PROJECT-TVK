/**
 * Container component for consistent spacing and layout
 */

import styled from 'styled-components'
import { theme } from '@styles/theme'

interface ContainerProps {
  maxWidth?: string
  padding?: string
}

export const Container = styled.div<ContainerProps>`
  max-width: ${(props) => props.maxWidth || '1280px'};
  margin: 0 auto;
  padding: ${(props) => props.padding || `${theme.spacing.lg}`};
  width: 100%;

  @media (max-width: ${theme.breakpoints.tablet}) {
    padding: ${theme.spacing.lg};
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: ${theme.spacing.md};
  }
`

export const Grid = styled.div<{ columns?: number; gap?: string }>`
  display: grid;
  grid-template-columns: repeat(${(props) => props.columns || 3}, 1fr);
  gap: ${(props) => props.gap || theme.spacing.xl};

  @media (max-width: ${theme.breakpoints.desktop}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: ${theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`

export const Flex = styled.div<{
  direction?: 'row' | 'column'
  align?: string
  justify?: string
  gap?: string
}>`
  display: flex;
  flex-direction: ${(props) => props.direction || 'row'};
  align-items: ${(props) => props.align || 'stretch'};
  justify-content: ${(props) => props.justify || 'flex-start'};
  gap: ${(props) => props.gap || theme.spacing.md};
`

export const Section = styled.section<{ padding?: string; background?: string }>`
  padding: ${(props) => props.padding || `${theme.spacing.xxxl} 0`};
  background-color: ${(props) => props.background || theme.colors.background};

  @media (max-width: ${theme.breakpoints.tablet}) {
    padding: ${theme.spacing.xxl} 0;
  }
`
