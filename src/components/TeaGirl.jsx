import { asset } from '../lib/assets.js';

// Use the approved artwork itself; crop the three poses in CSS without redrawing it.
export default function TeaGirl() {
  return <div className="tea-girl" role="img" aria-label="女孩抬起奶茶吸一大口，再放下杯子露出满足的笑容">
    <div className="tea-girl-frames" style={{ backgroundImage: `url("${asset('tea-girl-poses.png')}")` }} aria-hidden="true" />
  </div>;
}
