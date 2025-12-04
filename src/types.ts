import type { ReactNode } from 'react';

export interface NavItem {
  label: string;
  href: string;
}

export interface FeatureBlockProps {
  title: string;
  subtitle?: string;
  description: string;
  image?: string;
  video?: string;
  dark?: boolean;
  large?: boolean;
  className?: string;
  align?: 'left' | 'center';
}

export interface FadeInProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}
