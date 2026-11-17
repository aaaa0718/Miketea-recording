import { asset } from '../lib/assets.js';

export default function HeroArt() {
  return <div className="hero-art">
    <span className="art-label">Tea &amp; little joys</span>
    <img className="hero-portrait" src={asset('tea-girl.png')} alt="女孩捧着奶茶喝了一口" width="1254" height="1254" />
    <div className="art-caption"><span className="art-english">a cup of lovely things.</span><span className="art-subtitle">MILK TEA CLUB / 日常甜度收集所</span></div>
    <div className="hero-note">一杯，是生活的甜。<span>♡</span></div>
  </div>;
}
