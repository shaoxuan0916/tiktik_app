import axios from "axios"
import React, { useState } from "react"
import { BASE_URL } from "../../utils"
import { GoVerified } from "react-icons/go"
import Link from "next/link"
import { useRouter } from "next/router"
import useAuthStore from "../../store/authStore"
import { IUser, VideoType } from "../../types"
import VideoCard from "../../components/VideoCard"
import NoResults from "../../components/NoResults"

const Search = ({ videos }: { videos: VideoType[] }) => {
  const router = useRouter()
  const { searchTerm }: any = router.query
  const [isAccounts, setIsAccounts] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const { allUsers } = useAuthStore()

  const accounts = isAccounts ? "border-b-2 border-black" : "text-gray-400"
  const isVideos = !isAccounts ? "border-b-2 border-black" : "text-gray-400"

  const searchedAccounts = allUsers.filter((user: IUser) =>
    user.userName.toLowerCase().includes(searchTerm.toLowerCase())
  )
  return (
    <div className="w-full">
      <div className="">
        {isLoading ? (
          <div className="pt-10 pl-8">Loading...</div>
        ) : (
          <>
            <div className="flex gap-10 my-10 border-b-2 border-gray-200 bg-white w-full">
              <p
                className={`text-xl font-semibold mt-2 cursor-pointer ${accounts}`}
                onClick={() => setIsAccounts(true)}
              >
                Accounts
              </p>
              <p
                className={`text-xl font-semibold mt-2 cursor-pointer ${isVideos}`}
                onClick={() => setIsAccounts(false)}
              >
                Videos
              </p>
            </div>

            {isAccounts ? (
              <div className="md:mt-8 ">
                {searchedAccounts.length > 0 ? (
                  searchedAccounts.map((user: IUser, index: number) => (
                    <div className=" ">
                      {" "}
                      <Link href={`/profile/${user._id}`}>
                        <div className="flex gap-3 font-semibold p-2 rounded-md cursor-pointer hover:bg-primary border-b-2 border-gray-200">
                          <div className="w-12 h-12">
                            <img
                              src={user.image}
                              alt="profile photo"
                              className="w-[50px] h-[50px] rounded-full object-cover"
                            />
                          </div>

                          <div className="">
                            <p className="flex gap-1 items-center text-md font-bold text-primary lowercase">
                              {user.userName.replaceAll(" ", "")}{" "}
                              <GoVerified className="text-blue-400" />
                            </p>

                            <p className="text-gray-400">{user.userName}</p>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))
                ) : (
                  <NoResults text={`No accounts results for ${searchTerm}`} />
                )}
              </div>
            ) : (
              <div className="flex md:mt-16 gap-6 flex-wrap md:justify-start">
                {videos?.length > 0 ? (
                  videos.map((post: VideoType, index: number) => (
                    <VideoCard post={post} key={index} />
                  ))
                ) : (
                  <NoResults text={`No video results for ${searchTerm}`} />
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export const getServerSideProps = async ({
  params: { searchTerm },
}: {
  params: { searchTerm: string }
}) => {
  const res = await axios.get(`${BASE_URL}/api/search/${searchTerm}`)

  return {
    props: { videos: res.data },
  }
}

export default Search
