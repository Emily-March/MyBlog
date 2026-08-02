import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Icon from "@/components/Icon";
import { getAdjacentPosts, getPostBySlug, getPostSlugs } from "@/lib/posts";

export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "文章不存在" };
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      images: post.cover ? [post.cover] : [],
    },
  };
}

export default async function PostPage({ params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();
  const { previous, next } = getAdjacentPosts(slug);

  return (
    <main className="page-shell">
      <Link className="back-link" href="/archive"><Icon name="arrowLeft" size={15} />返回归档</Link>
      <div className="post-layout">
        <div>
          <article className="surface article">
            {post.cover && <Image className="article-cover" src={post.cover} alt="" width={1200} height={640} priority />}
            <header className="article-head">
              <span className="post-category">{post.category}</span>
              <h1>{post.title}</h1>
              <div className="article-meta">
                <span className="meta-item"><Icon name="calendar" size={14} />{post.date.replaceAll("-", ".")}</span>
                <span className="meta-item"><Icon name="clock" size={14} />{post.readingMinutes} 分钟阅读</span>
                <span className="meta-item"><Icon name="eye" size={14} />{post.views} 次阅读</span>
              </div>
              <div className="article-tags">{post.tags.map((tag) => <span className="article-tag" key={tag}>#{tag}</span>)}</div>
            </header>
            <div className="article-content" dangerouslySetInnerHTML={{ __html: post.html }} />
          </article>

          {(previous || next) && (
            <nav className="post-nav" aria-label="相邻文章">
              {previous ? <Link className="surface" href={`/posts/${previous.slug}`}><small>上一篇</small><strong>{previous.title}</strong></Link> : <span />}
              {next ? <Link className="surface" href={`/posts/${next.slug}`} style={{ textAlign: "right" }}><small>下一篇</small><strong>{next.title}</strong></Link> : <span />}
            </nav>
          )}
        </div>

        <aside className="surface toc">
          <h2>文章目录</h2>
          <nav>
            {post.headings.length ? post.headings.map((heading) => <a className={`level-${heading.level}`} href={`#${heading.id}`} key={`${heading.level}-${heading.id}`}>{heading.text}</a>) : <span className="section-note">这篇文章暂时没有小节。</span>}
          </nav>
        </aside>
      </div>
    </main>
  );
}
