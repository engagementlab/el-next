/**
 * @packageDocumentation
 * Engagement Lab 'Next' shared component library
 * Developed by Engagement Lab, 2022-2023
 *
 * @author Johnny Richardson
 * Flex layout renderer
 * ==========
 */
import React, { JSXElementConstructor, ReactElement } from 'react';

interface FlexProps {
  /**
   * Array of indices defining the layout type provided by the component
   */
  layout: [number, ...number[]];
  /**
   * The layout's columns
   */
  children: ReactElement<any, string | JSXElementConstructor<any>>[];
}

/**
 * Return a flex layout for document fields
 * @returns {JSX.Element} Element
 * @see https://keystonejs.com/docs/guides/document-fields#overriding-the-default-renderers
 * @remarks
 * This is a renderer component that overrides KeystoneJS 5.x's default layout DocumentRendererProp to use flex, rather than grid layout, allowing for responsive layout
 */
export const FlexLayout = ({ layout, children }: FlexProps) => {
  const flexClass = 'flex gap-x-5 flex-col-reverse lg:flex-row';
  // [  ][ ]
  if (layout[0] === 2 && layout[1] === 1) {
    return (
      <div className={flexClass}>
        {children.map((element, i) => (
          <div key={i} className={`${i === 0 ? 'w-full lg:w-3/4' : ''}`}>
            {element}
          </div>
        ))}
      </div>
    );
  }
  // [ ][  ]
  else if (layout[0] === 1 && layout[1] === 2) {
    return (
      <div className={flexClass}>
        {children.map((element, i) => (
          <div key={i} className={`${i === 1 ? 'w-full lg:w-3/4' : ''}`}>
            {element}
          </div>
        ))}
      </div>
    );
  }
  // [ ][ ][ ]
  else if (layout[0] === 1 && layout[1] === 1 && layout[2] === 1) {
    return (
      <div className={flexClass}>
        {children.map((element, i) => (
          <div key={i} className="w-full lg:w-1/3">
            {element}
          </div>
        ))}
      </div>
    );
  }
  // [ ][ ]
  else if (layout[0] === 1 && layout[1] === 1) {
    return (
      <div className={flexClass}>
        {children.map((element, i) => (
          <div
            key={i}
            className={`${
              i === 0 ? 'w-full lg:w-1/2 lg:basis-1/2 flex-shrink-0' : ''
            }`}
          >
            {element}
          </div>
        ))}
      </div>
    );
  } else return <div>{children}</div>;
};
