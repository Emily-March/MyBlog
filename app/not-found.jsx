import Link from "next/link";

export default function NotFound() {
  return (
    <main className="not-found">
      <div>
        <h1>404</h1>
        <p>这一页似乎随着晚风走远了。</p>
        <Link className="button primary" href="/">回到首页</Link>
      </div>
    </main>
  );
}
