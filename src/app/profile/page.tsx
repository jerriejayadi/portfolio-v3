import { client } from "@/sanity/client";
import { PROFILE_QUERY } from "@/sanity/lib/queries";
import { ProfileView } from "@/components/organisms/ProfileView";

export default async function ProfilePage() {
  let content = "";

  try {
    const data = await client.fetch(PROFILE_QUERY);
    content = data?.content || "";
  } catch (error) {
    console.error("Sanity fetch failed:", error);
  }

  return <ProfileView content={content} />;
}

