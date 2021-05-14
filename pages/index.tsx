import Head from "next/head";

import HomeTemplate from "@/core/templates/Home";
import { _getDoc } from "@/functions";

export default function Home({ SEO, forms, title }) {
  return (
    <>
      <Head>
        <title>{SEO?.title}</title>
      </Head>
      <HomeTemplate title={title} items={forms} />
    </>
  );
}

export async function getStaticProps() {
  const basePath = process.env.basePath;
  const data = await fetch(`${basePath}/api/v1`).then((r) => r.json());

  return {
    props: {
      SEO: data?.SEO || null,
      forms: data?.forms || null,
      title: data?.title || null,
    },
  };
}
