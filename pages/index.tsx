import axios from "axios"
import { NextPage } from "next"
import Head from "next/head"
import NoResults from "../components/NoResults"
import VideoCard from "../components/VideoCard"
import { VideoType } from "../types"

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
          <NoResults text="No Videos" />
        )}
      </div>
    </div>
  )
}

export const getServerSideProps = async () => {
  const response = await axios.get(`http://localhost:3000/api/post`)

  return {
    props: {
      videos: response.data,
    },
  }
}

export default Home
