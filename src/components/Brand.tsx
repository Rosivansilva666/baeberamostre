import { Link } from '@tanstack/react-router';
export function Brand() {
  return <Link to="/home" className="inline-flex shrink-0 items-center gap-3 text-foreground" aria-label="barberamostre, início"><svg width="34" height="34" viewBox="0 0 64 64" fill="none" aria-hidden="true"><rect x="1" y="1" width="62" height="62" stroke="currentColor" strokeWidth="2"/><path d="M16 47V17h15c8 0 12 3 12 8 0 4-2 6-6 7 5 1 8 3 8 7 0 5-4 8-13 8H16ZM16 32h17" stroke="currentColor" strokeWidth="4"/><path d="M51 15v34" stroke="var(--secondary)" strokeWidth="4"/></svg><span className="font-display text-lg font-black tracking-normal sm:text-xl">barbera<span className="text-secondary">mostre</span><span className="text-secondary">.</span></span></Link>;
}
