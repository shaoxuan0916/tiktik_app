import React, { useState } from "react"
import axios from "axios"
import { useRouter } from "next/router"
import { FaCloudUploadAlt } from "react-icons/fa"
import { MdDelete } from "react-icons/md"
import useAuthStore from "../store/authStore"
import { client } from "../utils/client"
import { SanityAssetDocument } from "@sanity/client"
import { topics } from "../utils/constants"
import { GiRoundStrawBale } from "react-icons/gi"
import { BASE_URL } from "../utils"

const upload = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [wrongVideoType, setWrongVideoType] = useState<boolean>(false)
  const [videoAsset, setVideoAsset] = useState<SanityAssetDocument | undefined>(
    undefined
  )
  const [caption, setCaption] = useState("")
  const [category, setCategory] = useState(topics[0].name)
  const [savingPost, setSavingPost] = useState(false)

  const { userProfile }: any = useAuthStore()

  const router = useRouter()

  const uploadVideo = async (e: any) => {
    const selectedFile = e.target.files[0]
    const fileTypes = ["video/mp4", "video/webm", "video/pgg"]

    if (fileTypes.includes(selectedFile.type)) {
      setIsLoading(true)
      client.assets
        .upload("file", selectedFile, {
          contentType: selectedFile.type,
          filename: selectedFile.name,
        })
        .then((data) => {
          setVideoAsset(data)
          setIsLoading(false)
        })
    } else {
      setIsLoading(false)
      setWrongVideoType(true)
    }
  }

  const handlePost = async () => {
    if (caption && videoAsset?._id && category) {
      setSavingPost(true)

      const document = {
        _type: "post",
        caption,
        video: {
          _type: "file",
          asset: {
            _type: "reference",
            _ref: videoAsset?._id,
          },
        },
        userId: userProfile?._id,
        postedBy: {
          _type: "postedBy",
          _ref: userProfile?._id,
        },
        topic: category,
      }

      await axios.post(`${BASE_URL}/api/post`, document)

      router.push("/")
    }
  }

  return (
    <div className="flex w-full h-full mb-10 pt-10 justify-center">
      <div className="bg-white rouded-lg xl:h-[80vh] w-[90%] max-w-[1000px] flex gap-8 flex-wrap justify-between items-center p-4 md:p-12 pt-6">
        {/* Left */}
        <div>
          <div>
            <p className="text-2xl font-bold">Upload Video</p>
            <p className="text-md text-gray-400 mt-1">
              Post a video to your account
            </p>
          </div>
          <div className="border-dashed border-4 border-gray-200 flex flex-col justify-center items-center outline-none mt-10 w-[260px] h-[460px] rounded-xl p-10 cursor-pointer hover:border-red-300 hover:bg-gray-100">
            {isLoading ? (
              <p>Uploading...</p>
            ) : (
              <div>
                {videoAsset ? (
                  <div>
                    <video
                      src={videoAsset.url}
                      loop
                      controls
                      className="rounded-xl  bg-black"
                    ></video>
                  </div>
                ) : (
                  <label className="cursor-pointer">
                    <div className="flex flex-col items-center justify-center h-full">
                      <div className="flex flex-col items-center justify-center">
                        <p className="text-xl font-bold">
                          <FaCloudUploadAlt className="text-gray-300 text-6xl" />
                        </p>
                        <p className="text-xl font-semibold">Upload Video</p>
                      </div>
                      <p className="text-gray-400 text-center mt-10 text-sm leading-10">
                        MP4 or WebM or ogg <br />
                        720x1080 or higher <br />
                        Up to 10 minutes <br />
                        Less than 2GB
                      </p>
                      <p className="bg-[#F51997] text-center mt-10 rounded text-white text-md font-medium p-2 w-52 outline-none">
                        Select File
                      </p>
                    </div>
                    <input
                      type="file"
                      name="upload-video"
                      onChange={uploadVideo}
                      className="w-0 h-0"
                    />
                  </label>
                )}
              </div>
            )}
            {wrongVideoType && (
              <p className="text-center text-xl text-red-400 font-semibold mt-4 w-[250px]">
                Please select a video file
              </p>
            )}
          </div>
        </div>

        {/* Right */}
        <div className="flex flex-col gap-3 pb-10">
          <label className="text-md font-medium">Caption</label>
          <input
            type="text"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            className="rounded outline-none text-md border-2 border-gray-200 p-2"
          />
          <label className="text-md font-medium">Choose a Category</label>
          <select
            name=""
            id=""
            className="outline-none border-2 border-gray-200 text-md capitalize lg:p-4 p-2 rounded cursor-pointer"
            onChange={(e) => setCategory(e.target.value)}
          >
            {topics.map((topic) => (
              <option
                key={topic.name}
                className="outline-none capitalize bg-white text-gray-700 text-md px-2 hover:bg-slate-300"
                value={topic.name}
              >
                {topic.name}
              </option>
            ))}
          </select>

          <div className="flex gap-6 mt-10">
            <button
              onClick={() => {}}
              type="button"
              className="border-gray-300 border-2 text-md font-medium p-2 rounded-md w-28 lg:w-44 outline-none"
            >
              Discard
            </button>
            <button
              onClick={handlePost}
              type="button"
              className="bg-[#F51997] text-white border-2 text-md font-medium p-2 rounded-md w-28 lg:w-44 outline-none"
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default upload
