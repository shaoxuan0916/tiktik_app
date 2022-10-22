import React, { Dispatch, SetStateAction } from "react"
import Image from "next/image"
import useAuthStore from "../store/authStore"
import Link from "next/link"
import NoResults from "./NoResults"
import { IUser } from "../types"
import { GoVerified } from "react-icons/go"

interface ICommentProps {
  comment: string
  comments: any[]
  setComment: Dispatch<SetStateAction<string>>
  isPostingComment: boolean
  addComment: (e: React.FormEvent) => void
}

interface IComment {
  comment: string
  lenght?: number
  _key: string
  postedBy: {
    _ref: string
    _id: string
  }
}

const Comments = ({
  comment,
  comments,
  setComment,
  isPostingComment,
  addComment,
}: ICommentProps) => {
  const { userProfile, allUsers } = useAuthStore()

  return (
    <div className="border-t-2 mt-4 border-gray-200 pt-4 px-10 bg-[#F8F8F8] border-b-2 lg:pb-0 pb-[100px]">
      <div className="overflow-scroll lg:h-[485px]">
        {comments?.length ? (
          <div className="">
            {comments.map((item, index) => (
              <div key={index}>
                {allUsers.map(
                  (user: IUser, index: number) =>
                    user._id === (item.postedBy._id || item.postedBy._ref) && (
                      <div className="p-2 items-center" key={index}>
                        <Link href={`/profile/${user._id}`}>
                          <div className="flex items-start gap-3">
                            <div className="w-12 h-12">
                              <img
                                src={user.image}
                                alt="profile photo"
                                className="w-[40px] h-[40px] rounded-full layout-reponsive object-cover"
                              />
                            </div>

                            <div className="">
                              <p className="flex gap-1 items-center text-md font-bold text-primary lowercase">
                                {user.userName.replaceAll(" ", "")}{" "}
                                <GoVerified className="text-blue-400" />
                              </p>

                              <p>{item.comment}</p>
                            </div>
                          </div>
                        </Link>
                      </div>
                    )
                )}
              </div>
            ))}
          </div>
        ) : (
          <NoResults text="No comments yet" />
        )}
      </div>

      {userProfile && (
        <div className="absolute bottom-0 left-0 pb-6 px-2 md:px-10">
          <form onSubmit={addComment} className="flex gap-4 ">
            <input
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Add Comment"
              className="bg-primary px-6 py-4 text-md font-medium border-2 w-[250px] md:w-[550px] lg:w-[350px] border-gray-100 outline-none focus-border-2 focus:border-gray-300 flex-1 rounded-lg"
            />

            <button className="text-md text-gray-400" onClick={addComment}>
              {isPostingComment ? "Commenting..." : "Comment"}
            </button>
          </form>
        </div>
      )}
    </div>
  )
}

export default Comments
