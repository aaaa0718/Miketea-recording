import TeaGirl from './TeaGirl.jsx';

export default function HeroArt() {
  return <div className="hero-art">
    <span className="art-label">Tea &amp; little joys</span>
    <TeaGirl />
    <div className="art-caption"><span className="art-english">a cup of lovely things.</span><span className="art-subtitle">MILK TEA CLUB / 日常甜度收集所</span></div>
    <div className="hero-note">一杯，是生活的甜。<span>♡</span></div>
  </div>;
}
