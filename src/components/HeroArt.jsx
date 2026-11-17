import TeaGirl from './TeaGirl.jsx';

export default function HeroArt() {
  return <div className="hero-art">
    <span className="art-label">AA’s tea break</span>
    <TeaGirl />
    <div className="art-caption"><span className="art-english">Just passing by.</span><span className="art-subtitle">AA’S TEA LOG</span></div>
    <div className="hero-note">本来只是路过。<span>♡</span></div>
  </div>;
}
