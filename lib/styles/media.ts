import { breakpoints } from "./breakpoints";

export const media = {
  mobile: `@media (max-width: ${breakpoints.mobile - 1}px)`,

  tablet: `@media (min-width: ${breakpoints.mobile}px) 
            and (max-width: ${breakpoints.tablet - 1}px)`,

  desktop: `@media (min-width: ${breakpoints.tablet}px) 
             and (max-width: ${breakpoints.desktop - 1}px)`,

  wide: `@media (min-width: ${breakpoints.desktop}px)`,
};
