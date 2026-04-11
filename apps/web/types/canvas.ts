export type Tool = 'select' | 'pan' | 'rect' | 'circle' | 'line';

export type DrawShape =
  | { shape: 'rect'; x: number; y: number; width: number; height: number }
  | { shape: 'circle'; x: number; y: number; radius: number }
  | { shape: 'line'; points: number[] };