/**
 * Engagement Lab 'Next' shared component library
 * Developed by Engagement Lab, 2022-2023
 * @packageDocumentation
 * @author Johnny Richardson
 * KeystoneJS document field block renderers
 * ==========
 */

import React from 'react';
import Link from 'next/link';

import Image from '../image';
import { Video } from '../video';

/**
 * Create function that returns custom block renderers used by Keystone
 * @function
 * @param {string} [styles] - optional app-globalized tailwindcss classes to all blocks
 * @returns {function}
 * @see https://keystonejs.com/docs/guides/document-fields#component-blocks
 */
export const BlockRenderers = (styles?: { buttonClass?: string }) => {
  /**
   * @function
   * @param {JSX.Element} [imageOveride] - optional app-globalized tailwindcss classes to all blocks
   * @returns {function}
   */
  return (blockOverrides: {
    imageOverride?: { (props: any): JSX.Element };
    peopleOverride?: { (peopleProps: any): JSX.Element };
    buttonOverride?: { (props: any): JSX.Element };
  }) => {
    let blocks = {
      image: (props: any) => {
        const publicId = props.image.publicId || props.image.image.publicId;
        const alt = props.image.alt || props.image.image?.alt;

        return blockOverrides.imageOverride ? (
          blockOverrides.imageOverride(props)
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Image
              id={'img-' + publicId}
              alt={alt || ''}
              imgId={publicId}
              aspectDefault={true}
            />
            {/* <p>{props.image.data.caption}</p> */}
          </div>
        );
      },
      video: (props: any) => {
        return (
          <Video
            videoLabel={props.video.label}
            videoUrl={props.video.value}
            thumbUrl={props.video.thumb}
          />
        );
      },
      button: (props: any) => {
        return blockOverrides.buttonOverride ? (
          blockOverrides.buttonOverride(props)
        ) : (
          <Link href={props.link.props.node.children[0].text} passHref>
            <button
              className={`block lg:inline-block transition-all uppercase whitespace-nowrap ${
                styles && styles.buttonClass
                  ? styles.buttonClass
                  : 'px-9 py-7 mt-4'
              }`}
            >
              {props.label}
            </button>
          </Link>
        );
      },
      pageAnchor: (props: any) => {
        return <span id={props.anchorId.props.node.children[0].text}></span>;
      },
      associatedPeople: (props: any) => {
        return blockOverrides.peopleOverride ? (
          blockOverrides.peopleOverride(props)
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <p>ppl</p>
            {/* <p>{props.image.data.caption}</p> */}
          </div>
        );
      },
    };
    return blocks;
  };
};
