declare module 'vanta/dist/vanta.dots.min' {
  type VantaEffect = {
    destroy: () => void;
  };

  const DOTS: (options: any) => VantaEffect;
  export default DOTS;
}


