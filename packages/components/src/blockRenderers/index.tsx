import React from "react";
import Link from "next/link";

import Image from "../image";
import { Video } from "../video";

export const BlockRenderers = (buttonClass?: string) => {

  return (imageOveride?: { (props: any): JSX.Element }, peopleOveride?: { (peopleProps: any): JSX.Element }) => {
    let blocks = {
      image: (props: any) => {
        return imageOveride ? imageOveride(props) : 
          (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <Image id={'img-' + props.image.publicId} alt={props.image.alt} imgId={props.image.publicId} aspectDefault={true} />
              {/* <p>{props.image.data.caption}</p> */}
            </div>
          );
      },
      video: (props: any) => {
        return <Video videoLabel={props.video.label} videoUrl={props.video.value} thumbUrl={props.video.thumb} />;
      },
      button: (props: any) => {
        return (
          <Link href={props.link.props.node.children[0].text} passHref>
            <button
              className={`block lg:inline-block transition-all uppercase whitespace-nowrap ${buttonClass || 'px-9 py-7 mt-4'}`}>
              {props.label}
            </button>
          </Link>
        );
      },
      associatedPeople: (props: any) => {
        return peopleOveride ? peopleOveride(props) : (
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <p>ppl</p>
            {/* <p>{props.image.data.caption}</p> */}
          </div>
        );
      }
    }
    return blocks;
  };
};