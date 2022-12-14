import axios from "axios"
import { NextPage } from "next"
import Head from "next/head"
import NoResults from "../components/NoResults"
import VideoCard from "../components/VideoCard"
import { VideoType } from "../types"
import { BASE_URL } from "../utils"

interface IProps {
  videos: VideoType[]
}

const Home: NextPage<IProps> = ({ videos }) => {
  return (
    <div>
      <Head>
        <title>TikTik App</title>
        <meta name="description" content="This is TikTik App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col gap-10 videos h-full ">
        {videos.length ? (
          videos.map((video: VideoType) => (
            <VideoCard post={video} key={video._id} />
          ))
        ) : (
          <div className="mt-20">
            <NoResults text="No Videos" />
          </div>
        )}
      </div>
    </div>
  )
}

export const getServerSideProps = async ({
  query: { topic },
}: {
  query: { topic: string }
}) => {
  let response = null
  if (topic) {
    response = await axios.get(`${BASE_URL}/api/discover/${topic}`)
  } else {
    response = await axios.get(`${BASE_URL}/api/post`)
  }

  return {
    props: {
      videos: response.data,
    },
  }
}

export default Home
