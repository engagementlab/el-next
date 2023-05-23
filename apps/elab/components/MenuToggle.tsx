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
        scale: 1.03,
        transition: { duration: 0.3 },
      }}
      className="relative z-50"
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
            hover: { fill: '#f6a536', r: 75 },
            open: { fill: '#000', r: 75 },
          }}
          transition={{ duration: 0.3, type: 'spring' }}
        />
        <Path
          d="M 25 25 L 45 25"
          animate={currentState()}
          variants={{
            open: { rotate: '-45deg', translateY: '10px' },
            hover: { d: 'M 25 25 L 55 25' },
          }}
          transition={{ duration: 0.1 }}
        />
        <Path
          d="M 25 35 L 45 35"
          opacity={1}
          animate={currentState()}
          variants={{
            closed: { d: 'M 2 16.346 L 20 16.346', opacity: 1 },
            open: { d: 'M 0 35 L 0 35', opacity: 0 },
            hover: { d: 'M 20 35 L 50 35' },
          }}
        />
        <Path
          d="M 25 45 L 45 45"
          animate={currentState()}
          variants={{
            closed: { d: 'M 2 16.346 L 20 16.346' },
            open: { rotate: '45deg', translateY: '-10px' },
            hover: { d: 'M 31 45 L 50 45' },
          }}
        />
      </svg>
    </motion.button>
  );
};
