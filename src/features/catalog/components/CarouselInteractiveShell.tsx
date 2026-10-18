'use client';

import { useRef, type ReactNode } from 'react';

interface CarouselInteractiveShellProps {
  title: string;
  children: ReactNode; // Here the RSC Payload already rendered on the server is injected
}