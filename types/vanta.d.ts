declare module 'vanta/dist/vanta.dots.min' {
  type VantaEffect = {
    destroy: () => void;
  };

  type VantaDotsOptions = {
    el: HTMLElement;
    mouseControls?: boolean;
    touchControls?: boolean;
    gyroControls?: boolean;
    minHeight?: number;
    minWidth?: number;
    scale?: number;
    scaleMobile?: number;
    color?: number;
    color2?: number;
    backgroundColor?: number;
    size?: number;
    spacing?: number;
    showLines?: boolean;
  };

  const DOTS: (options: VantaDotsOptions) => VantaEffect;
  export default DOTS;
}


