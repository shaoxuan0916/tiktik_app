import React from "react"
import { footerList1, footerList2, footerList3 } from "../utils/constants"

const List = ({ items, mt }: { items: string[]; mt: boolean }) => (
  <div className="mt-6 hidden xl:block">
    <div className={`flex flex-wrap gap-2 ${mt && "mt-5"}`}>
      {items.map((item: any) => (
        <p
          key={item}
          className="text-gray-400 text-sm hover:underline cursor-pointer"
        >
          {item}
        </p>
      ))}
    </div>
  </div>
)

const Footer = () => {
  return (
    <>
      <List items={footerList1} mt={false} />
      <List items={footerList2} mt />
      <List items={footerList3} mt />
      <p className="text-gray-400 text-sm mt-5">2022 TikTik</p>
    </>
  )
}

export default Footer
