import { Inter } from "next/font/google";

import { Post } from "@/types/post";

import styles from "./page.module.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Manjiro Next",
  robots: {
    index: false,
    follow: true,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default async function Home() {
  const posts: Post[] = await getPosts();

  return (
    <main className={`${styles.main} ${inter.className}`}>
      <h1>Posts</h1>
      {posts.map((post) => (
        <article key={post.id}>
          <h2>{post.title.rendered}</h2>
          <div dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
        </article>
      ))}
    </main>
  );
}

async function getPosts() {
  const endpoint = "https://manjiro.net/wp-json/wp/v2/posts" satisfies string;

  const res = await fetch(endpoint, {
    next: {
      revalidate: 60 * 60,
    },
  });

  return res.json();
}
