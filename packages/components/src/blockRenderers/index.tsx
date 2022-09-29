import React from "react";
import { InferRenderersForComponentBlocks } from "@keystone-6/fields-document/component-blocks";
import Link from "next/link";
import {componentBlocks} from '../../../../apps/cms/admin/components';
import { Image } from "../image";
import { Video } from "../video";

export const BlockRenderers = (imageOveride?: { (props: any): JSX.Element }, peopleOveride?: { (peopleProps: any): JSX.Element }) => {
  let blocks: InferRenderersForComponentBlocks<typeof componentBlocks>  = {
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
            className='block lg:inline-block rounded-full px-9 py-7 mt-4 uppercase whitespace-nowrap bg-lynx text-bluegreen border-2 border-bluegreen transition-all duration-700 hover:bg-green-blue hover:text-lynx hover:border-green-blue hover:scale-105'>
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
  // if() blocks.image = 
  return blocks;
};