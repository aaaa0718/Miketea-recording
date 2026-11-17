import TeaGirl from './TeaGirl.jsx';

export default function HeroArt() {
  return <div className="hero-art">
    <span className="art-label">AA’s tea break</span>
    <TeaGirl />
    <div className="hero-note">这杯不错，下次还点<span>♡</span></div>
  </div>;
}
