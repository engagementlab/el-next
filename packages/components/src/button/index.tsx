import React from "react";
import Link from "next/link";

type ButtonProps = {
  className?: string,
  hoverColor?: string,
  link: string,
  label: string,
  margin?: string,
};
export const Button = ({
    className,
    hoverColor,
    link,
    label,
    margin
}: ButtonProps) => {
    return (
      <Link href={link} passHref>
        <button 
        className={`${
            margin !== undefined ? margin : `my-10`
        } inline-block rounded-full px-10 py-7 uppercase bg-purple text-white transition-all duration-700 hover:bg-[#ab45f8] hover:scale-105 ${className} `}
      >
        {label}</button>
        </Link>
    );
  }