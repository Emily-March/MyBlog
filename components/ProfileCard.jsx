import Image from "next/image";
import ContactLinks from "./ContactLinks";

export default function ProfileCard({ postCount, tagCount, categoryCount }) {
  return (
    <section className="surface profile-card">
      <Image className="profile-avatar" src="/images/avatar.jpg" alt="Emily" width={172} height={172} priority />
      <h2>Emily</h2>
      <p className="profile-signature">我破晓，无远弗届</p>
      <div className="profile-stats">
        <div className="profile-stat"><strong>{postCount}</strong><span>文章</span></div>
        <div className="profile-stat"><strong>{tagCount}</strong><span>标签</span></div>
        <div className="profile-stat"><strong>{categoryCount}</strong><span>分类</span></div>
      </div>
      <ContactLinks />
    </section>
  );
}
