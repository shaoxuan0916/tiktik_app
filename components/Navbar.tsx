import React from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import { AiOutlineLogout } from "react-icons/ai"
import { BiSearch } from "react-icons/bi"
import { IoMdAdd } from "react-icons/io"
import { GoogleLogin, googleLogout } from "@react-oauth/google"
import Logo from "../utils/tiktik-logo.png"
import { createOrGetUser } from "../utils"
import useAuthStore from "../store/authStore"

const Navbar = () => {
  const { userProfile, addUser, removeUser }: any = useAuthStore()

  return (
    <div className="w-full flex justify-between items-center border-b-2 border-gray-200 py-2 px-4">
      <Link href="/">
        <div className="w-[100px] md:w-[130px] ">
          <Image
            className="cursor-pointer"
            src={Logo}
            alt="tiktik"
            layout="responsive"
          />
        </div>
      </Link>

      <div>SEARCH</div>
      <div>
        {userProfile ? (
          <div className="flex gap-5 items-center">
            <Link href="/upload">
              <button className="border-2 flex items-center gap-2 text-md rounded-md hover:bg-primary py-1 px-2 md:px-4 font-semibold">
                <IoMdAdd className="text-xl" /> {` `}
                <span className="hidden md:block">Upload</span>
              </button>
            </Link>

            <p className="text-md">{userProfile.userName}</p>
            {/* {userProfile.image && (
              <Link href="/">
                <>
                  <Image
                    width={40}
                    height={40}
                    className="rounded-full cursor-pointer"
                    src={userProfile.image}
                    alt="profile photo"
                  />
                </>
              </Link>
            )} */}

            <button
              type="button"
              className="hover:bg-primary p-2 rounded-full shadow-lg"
              onClick={() => {
                googleLogout()
                removeUser()
              }}
            >
              <AiOutlineLogout className="" fontSize={21} />
            </button>
          </div>
        ) : (
          // <div>{userProfile.userName}</div>
          <GoogleLogin
            onSuccess={(response) => createOrGetUser(response, addUser)}
            onError={() => console.log("Error")}
          />
        )}
      </div>
    </div>
  )
}

export default Navbar
