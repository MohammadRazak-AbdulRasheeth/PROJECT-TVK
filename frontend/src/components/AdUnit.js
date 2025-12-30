import { jsx as _jsx } from "react/jsx-runtime";
/**
 * Google AdSense Ad Unit Component
 */
import { useEffect } from 'react';
import styled from 'styled-components';
import { theme } from '@styles/theme';
const AdContainer = styled.div `
  margin: ${theme.spacing.xl} 0;
  text-align: center;
  min-height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const AdUnit = () => {
    useEffect(() => {
        try {
            // @ts-ignore
            (window.adsbygoogle = window.adsbygoogle || []).push({});
        }
        catch (e) {
            console.error('AdSense error:', e);
        }
    }, []);
    return (_jsx(AdContainer, { children: _jsx("ins", { className: "adsbygoogle", style: { display: 'block' }, "data-ad-client": "ca-pub-9189174535642414", "data-ad-slot": "1783224995", "data-ad-format": "auto", "data-full-width-responsive": "true" }) }));
};
