import { asset } from '../lib/assets.js';
import { useId } from 'react';

// Transparent puppet layers move independently on a shared continuous timeline.
function Part({ region, ...props }) {
  return <svg {...props} viewBox={region} preserveAspectRatio="none" overflow="hidden">
    <image href={asset('tea-girl-puppet.png')} width="1254" height="1254" />
  </svg>;
}

export default function TeaGirl() {
  const faceMask = useId();
  const mouthMask = useId();
  const feather = useId();
  return <svg className="tea-girl tea-puppet" viewBox="0 0 320 450" role="img" aria-label="女孩缓缓抬杯吸奶茶，放下杯子后开心地眯眼微笑">
    <defs>
      <filter id={feather}><feGaussianBlur stdDeviation="1.5" /></filter>
      <mask id={faceMask} maskUnits="userSpaceOnUse" x="0" y="0" width="320" height="310">
        <g fill="white" filter={`url(#${feather})`}><ellipse cx="115" cy="199" rx="32" ry="25" /><ellipse cx="209" cy="199" rx="32" ry="25" /></g>
      </mask>
      <mask id={mouthMask} maskUnits="userSpaceOnUse" x="0" y="0" width="320" height="310">
        <ellipse cx="167" cy="233" rx="17" ry="12" fill="white" filter={`url(#${feather})`} />
      </mask>
    </defs>
    <Part region="0 627 627 627" x="42" y="247" width="236" height="200" />
    <g className="puppet-head">
      <Part region="0 0 627 627" x="5" y="0" width="310" height="310" />
      <g className="puppet-face-happy">
        <g mask={`url(#${faceMask})`}><Part region="627 0 627 627" x="5" y="0" width="310" height="310" /></g>
        <g mask={`url(#${mouthMask})`}><Part region="627 0 627 627" x="5" y="10" width="310" height="310" /></g>
      </g>
      <g className="puppet-sip-mouth">
        <ellipse cx="168" cy="233" rx="12" ry="7" fill="#fbdac5" />
        <path d="M164 234q4 4 8 0" fill="none" stroke="#8c5d47" strokeWidth="2.5" strokeLinecap="round" />
      </g>
    </g>
    <g className="puppet-arms"><Part region="627 627 627 627" x="60" y="248" width="220" height="220" /></g>
    <g className="puppet-joy" fill="none" stroke="#b39bbf" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <path d="M277 105c-14-17-26 0-12 10l13 10 12-14c10-13-6-23-13-6Z" fill="#e9dfee" />
      <path d="m290 85 5-7m3 20 8-2" />
    </g>
  </svg>;
}
