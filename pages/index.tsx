import type { NextPage } from "next"
import Head from "next/head"

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>TikTik App</title>
        <meta name="description" content="This is TikTik App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className="text-3xl">Hello World</h1>
    </div>
  )
}

export default Home
