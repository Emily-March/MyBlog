import MomentsClient from "@/components/MomentsClient";
import { getMoments } from "@/lib/moments";

export const metadata = {
  title: "说说",
  description: "记录 Emily 的短暂念头、日常片段与此刻心情。",
};

export default function MomentsPage() {
  return <MomentsClient moments={getMoments()} />;
}
