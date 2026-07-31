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
        <svg preserveAspectRatio="none" viewBox="0 0 2880 120">
          <path className="wave-back" d="M0 68C240 18 480 104 720 57S1200 17 1440 63s480 35 720-7 480-25 720 12v52H0Z" />
          <path className="wave-back" d="M1440 68c240-50 480 36 720-11s480-40 720 6 480 35 720-7 480-25 720 12v52H1440Z" />
          <path className="wave-middle" d="M0 82c300-38 420 20 720-9s420-37 720 5 420 25 720-4 420-30 720 8v38H0Z" />
          <path className="wave-middle" d="M1440 82c300-38 420 20 720-9s420-37 720 5 420 25 720-4 420-30 720 8v38H1440Z" />
          <path className="wave-front" d="M0 94c260-22 480 20 720 1s480-24 720 3 480 16 720-2 480-17 720 4v20H0Z" />
          <path className="wave-front" d="M1440 94c260-22 480 20 720 1s480-24 720 3 480 16 720-2 480-17 720 4v20H1440Z" />
        </svg>
      </div>
    </section>
  );
}
