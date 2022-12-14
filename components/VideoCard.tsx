import React, { useEffect, useRef, useState } from "react"
import { NextPage } from "next"
import { VideoType } from "../types"
import { HiVolumeUp, HiVolumeOff } from "react-icons/hi"
import { BsPlay, BsFillPlayFill, BsFillPauseFill } from "react-icons/bs"
import { GoVerified } from "react-icons/go"
import Link from "next/link"
import Image from "next/image"

interface IVideoCardProps {
  post: VideoType
}

const VideoCard: NextPage<IVideoCardProps> = ({ post }) => {
  const [isHover, setIsHover] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [muted, setMuted] = useState(false)

  const videoRef = useRef<HTMLVideoElement>(null)

  const onVideoPress = () => {
    if (playing) {
      videoRef?.current?.pause()
      setPlaying(false)
    } else {
      videoRef?.current?.play()
      setPlaying(true)
    }
  }

  useEffect(() => {
    if (videoRef?.current) {
      videoRef.current.muted = muted
    }
  }, [muted])

  return (
    <div className="flex flex-col xl:border-b-2 xl:border-gray-200 pb-4 xl:pb-6">
      <div>
        <div className="flex gap-3 p-2 cursor-pointer font-semibold rounded">
          <div className="md:w-16 md:h-16 w-10 h-10 ">
            <Link href={`/profile/${post.postedBy._id}`}>
              <>
                <img
                  src={post.postedBy.image}
                  alt="profile photo"
                  className="w-[40px] h-[40px] md:w-[62px] md:h-[62px] rounded-full layout-reponsive object-cover"
                />

                {/* <Image
                  width={62}
                  height={62}
                  className="rounded-full"
                  src={post.postedBy.image}
                  alt="profile photo"
                  layout="responsive"
                /> */}
              </>
            </Link>
          </div>
          <div>
            <Link href={`/profile/${post.postedBy._id}`}>
              <div className="flex items-center gap-2">
                <p className="flex gap-2 items-center md:text-md font-bold text-primary">
                  {post.postedBy.userName} {` `}
                  <GoVerified className="text-blue-400 text-md" />
                </p>
                <p className="capitalize text-gray-500 font-medium text-xs hidden md:block">
                  {post.postedBy.userName}
                </p>
              </div>
            </Link>
          </div>
        </div>
      </div>

      <div className="lg:ml-20 flex gap-4 relative">
        <div
          className="rounded-3xl"
          onMouseEnter={() => {
            setIsHover(true)
          }}
          onMouseLeave={() => {
            setIsHover(false)
          }}
        >
          <Link href={`/detail/${post._id}`}>
            <video
              src={post.video.asset.url}
              ref={videoRef}
              loop
              className="lg:w-[600px] h-[300px] md:h-[400px] lg:h-[500px] w-[200px] rounded-2xl cursor-pointer bg-gray-100"
            ></video>
          </Link>

          {isHover && (
            <div className="absolute bottom-6 left-8 cursor-pointer md:left-14 lg:left-0 flex gap-10 lg:justify-between w-[100px] md:w-[50px] p-3">
              {playing ? (
                <button onClick={onVideoPress}>
                  <BsFillPauseFill className="text-black bg-black/20 rounded-full p-[2px] text-2xl lg:text-4xl" />
                </button>
              ) : (
                <button onClick={onVideoPress}>
                  <BsFillPlayFill className="text-black bg-black/20 rounded-full p-[2px] text-2xl lg:text-4xl" />
                </button>
              )}
              {muted ? (
                <button onClick={() => setMuted(false)}>
                  <HiVolumeOff className="text-black bg-black/20 rounded-full p-[2px] text-2xl lg:text-4xl" />
                </button>
              ) : (
                <button onClick={() => setMuted(true)}>
                  <HiVolumeUp className="text-black bg-black/20 rounded-full p-[2px] text-2xl lg:text-4xl" />
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default VideoCard
