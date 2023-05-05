import * as React from 'react';
import { SVGMotionProps, motion } from 'framer-motion';

const Path = (
  props: JSX.IntrinsicAttributes &
    SVGMotionProps<SVGPathElement> &
    React.RefAttributes<SVGPathElement>
) => (
  <motion.path
    fill="transparent"
    strokeWidth="3"
    stroke="#fff"
    strokeLinecap="square"
    {...props}
  />
);

export const MenuToggle = ({ toggle, hover, isHover, isOpen }: any) => {
  const currentState = () => {
    if (isOpen) return 'open';
    else if (isHover) return 'hover';
    else return 'default';
  };
  return (
    <motion.button
      onClick={toggle}
      onHoverStart={hover}
      onHoverEnd={hover}
      whileHover={{
        scale: 1.2,
        transition: { duration: 0.3 },
      }}
      className="relative z-75"
    >
      <svg width="75" height="75" viewBox="0 0 75 75">
        <motion.circle
          cx="35"
          cy="35"
          r="30"
          fill="#00ab9e"
          animate={currentState()}
          variants={{
            default: { fill: '#00ab9e' },
            hover: { fill: '#f6a536', r: 100 },
            open: { fill: '#000' },
          }}
          transition={{ duration: 0.3 }}
        />
        <Path
          d="M 25 35 L 45 35"
          animate={currentState()}
          variants={{
            // closed: { d: 'M 2 16.346 L 20 16.346' },
            open: { d: 'M 3 2.5 L 17 16.346' },
            hover: { d: 'M 20 35 L 50 35' },
          }}
        />
        <Path
          d="M 25 45 L 45 45"
          variants={{
            // closed: { d: 'M 2 16.346 L 20 16.346' },
            open: { d: 'M 3 2.5 L 17 16.346' },
          }}
        />
        <Path
          d="M 25 25 L 45 25"
          animate={currentState()}
          variants={{
            // closed: { opacity: 1 },
            open: { d: 'M 20 35 L 50 35' },
            hover: { d: 'M 25 25 L 55 25' },
          }}
          transition={{ duration: 0.1 }}
        />
      </svg>
    </motion.button>
  );
};
