
/**
 * Engagement Lab 'Next' shared component library
 * Developed by Engagement Lab, 2022
 *
 * @author Johnny Richardson
 * KeystoneJS document field block renderers
 * ==========
 */

import React from "react";
import Link from "next/link";

import Image from "../image";
import { Video } from "../video";

/**
 * Create function that returns custom block rendrers used by Keystone
 * @function
 * @param {object} [styles] - optional app-globalized style classes to all blocks
 * @returns {function}
 */
export const BlockRenderers = (styles?: {
                                buttonClass?: string,
                              }) => {

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
              className={`block lg:inline-block transition-all uppercase whitespace-nowrap ${styles.buttonClass || 'px-9 py-7 mt-4'}`}>
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