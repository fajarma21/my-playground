import { unstable_ViewTransition as ViewTransition } from 'react';
import type { ThumbWrapperProps } from './View.types';

const ThumbWrapper = ({ children, viewTransition }: ThumbWrapperProps) => {
  if (ViewTransition !== undefined && viewTransition) {
    return <ViewTransition name={viewTransition}>{children}</ViewTransition>;
  }
  return <>{children}</>;
};

export default ThumbWrapper;
