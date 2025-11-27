import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import styled from 'styled-components';
import { theme } from '@styles/theme';
import { Button } from '@components/Button';
import { useNavigate } from 'react-router-dom';
const NotFoundContainer = styled.div `
  text-align: center;
  padding: ${theme.spacing.xxxl} 0;
  min-height: 60vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const NotFoundTitle = styled.h1 `
  color: ${theme.colors.primary};
  font-size: ${theme.typography.fontSize['4xl']};
  margin-bottom: ${theme.spacing.lg};
  
  @media (max-width: ${theme.breakpoints.tablet}) {
    font-size: ${theme.typography.fontSize['3xl']};
  }
`;
const NotFoundMessage = styled.p `
  color: ${theme.colors.text.secondary};
  font-size: ${theme.typography.fontSize.lg};
  margin-bottom: ${theme.spacing.xl};
  max-width: 500px;
  line-height: 1.6;

  @media (max-width: ${theme.breakpoints.tablet}) {
    font-size: ${theme.typography.fontSize.base};
  }
`;
const EmojiIcon = styled.div `
  font-size: 4rem;
  margin-bottom: ${theme.spacing.lg};
  
  @media (max-width: ${theme.breakpoints.tablet}) {
    font-size: 3rem;
  }
`;
const ButtonGroup = styled.div `
  display: flex;
  gap: ${theme.spacing.md};
  flex-wrap: wrap;
  justify-content: center;
`;
export const NotFound = () => {
    const navigate = useNavigate();
    const handleGoHome = () => {
        navigate('/');
    };
    const handleGoBack = () => {
        window.history.length > 1 ? navigate(-1) : navigate('/');
    };
    return (_jsx("section", { style: { padding: `${theme.spacing.xxxl} ${theme.spacing.lg}` }, children: _jsx("div", { style: { maxWidth: '1280px', margin: '0 auto' }, children: _jsxs(NotFoundContainer, { children: [_jsx(EmojiIcon, { children: "\uD83D\uDD0D" }), _jsx(NotFoundTitle, { children: "404 - Page Not Found" }), _jsx(NotFoundMessage, { children: "Sorry, the page you are looking for could not be found. It might have been moved, deleted, or you entered the wrong URL." }), _jsxs(ButtonGroup, { children: [_jsx(Button, { variant: "primary", onClick: handleGoHome, children: "\uD83C\uDFE0 Go Home" }), _jsx(Button, { variant: "outline", onClick: handleGoBack, children: "\u2190 Go Back" })] })] }) }) }));
};
