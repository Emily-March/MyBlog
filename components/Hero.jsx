import Link from "next/link";
import Icon from "./Icon";

export default function Hero() {
  return (
    <section className="home-hero">
      <div className="hero-content">
        <h1 className="hero-heading">Every Moment <span>I Love You</span></h1>
        <p className="hero-subtitle">我破晓，无远弗届</p>
        <div className="hero-actions">
          <a className="button primary" href="#latest"><Icon name="book" size={16} />开始阅读</a>
          <Link className="button" href="/about"><Icon name="user" size={16} />关于我</Link>
        </div>
      </div>
      <div className="hero-waves" aria-hidden="true">
        <svg preserveAspectRatio="none" viewBox="0 0 1440 120">
          <path className="wave-back" d="M0 68C180 28 540 28 720 68s540 40 720 0 540-40 720 0 540 40 720 0v52H0Z" />
          <path className="wave-middle" d="M0 82c180 30 540 30 720 0s540-30 720 0 540 30 720 0 540-30 720 0v38H0Z" />
          <path className="wave-front" d="M0 96c180-18 540-18 720 0s540 18 720 0 540-18 720 0 540 18 720 0v24H0Z" />
        </svg>
      </div>
    </section>
  );
}
