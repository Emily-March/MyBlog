import Image from "next/image";
import Link from "next/link";
import Icon from "./Icon";

function dateLabel(date) {
  return date.replaceAll("-", ".");
}

export default function PostCard({ post }) {
  return (
    <Link className="surface post-card" href={`/posts/${post.slug}`}>
      <div className="post-card-media">
        {post.cover ? (
          <Image src={post.cover} alt="" fill sizes="(max-width: 720px) 100vw, 480px" />
        ) : (
          <div className="post-card-placeholder" aria-hidden="true">{post.title.slice(0, 1)}</div>
        )}
      </div>
      <div className="post-card-body">
        <span className="post-category">{post.category}</span>
        <h3>{post.title}</h3>
        <p className="post-excerpt">{post.excerpt}</p>
        <div className="post-meta">
          <span className="meta-item"><Icon name="calendar" size={13} />{dateLabel(post.date)}</span>
          <span className="meta-item"><Icon name="eye" size={13} />{post.views} 次阅读</span>
        </div>
      </div>
    </Link>
  );
}
