import { NextPage } from "next"
import React, { useEffect, useState } from "react"
import Image from "next/image"
import axios from "axios"
import { GoVerified } from "react-icons/go"
import VideoCard from "../../components/VideoCard"
import NoResults from "../../components/NoResults"
import { IUser, VideoType } from "../../types"
import { BASE_URL } from "../../utils"

interface IProfileProps {
  data: {
    user: IUser
    userVideos: VideoType[]
    userLikedVideos: VideoType[]
  }
}

const Profile: NextPage<IProfileProps> = ({ data }) => {
  const { user, userVideos, userLikedVideos } = data

  const [showUserVideos, setShowUserVideos] = useState(true)
  const [isLoading, setIsLoading] = useState(true)

  const [videoList, setVideoList] = useState<VideoType[]>([])

  const videos = showUserVideos ? "border-b-2 border-black" : "text-gray-400"
  const liked = !showUserVideos ? "border-b-2 border-black" : "text-gray-400"

  useEffect(() => {
    if (showUserVideos) {
      setVideoList(userVideos)
      setIsLoading(false)
    } else {
      setVideoList(userLikedVideos)
      setIsLoading(false)
    }
  }, [showUserVideos, userLikedVideos, userVideos])

  return (
    <div className="w-full">
      <div className="flex gap-4 md:gap-10 bg-white w-full">
        <div className="w-16 h-16 md:w-32 md:h-32 items-center justify-center flex">
          <img
            src={user.image}
            alt="profile photo"
            className="md:w-[100px] md:h-[100px] w-[48px] h-[48px] rounded-full layout-reponsive object-cover"
          />
        </div>

        <div className="flex flex-col justify-center">
          <p className="md:text-3xl tracking-wider flex justify-center  gap-1 items-center text-md font-bold text-primary lowercase">
            {user.userName.replaceAll(" ", "")}{" "}
            <GoVerified className="text-blue-400" />
          </p>

          <p className="capitalize md:text-xl text-gray text-xs">
            {user.userName}
          </p>
        </div>
      </div>

      <div className="">
        {isLoading ? (
          <div className="pt-10 pl-8">Loading...</div>
        ) : (
          <>
            <div className="flex gap-10 my-10 border-b-2 border-gray-200 bg-white w-full">
              <p
                className={`text-xl font-semibold mt-2 cursor-pointer ${videos}`}
                onClick={() => setShowUserVideos(true)}
              >
                Videos
              </p>
              <p
                className={`text-xl font-semibold mt-2 cursor-pointer ${liked}`}
                onClick={() => setShowUserVideos(false)}
              >
                Liked
              </p>
            </div>

            <div className="flex gap-6 flex-wrap md:justify-start">
              {videoList.length > 0 ? (
                videoList.map((post: VideoType, index: number) => (
                  <VideoCard post={post} key={index} />
                ))
              ) : (
                <NoResults
                  text={`No ${showUserVideos ? "" : "Liked"} Videos Yet`}
                />
              )}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export const getServerSideProps = async ({
  params: { id },
}: {
  params: { id: string }
}) => {
  const res = await axios.get(`${BASE_URL}/api/profile/${id}`)

  return {
    props: { data: res.data },
  }
}

export default Profile
