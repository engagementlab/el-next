import * as React from 'react';
import { SVGMotionProps, motion } from 'framer-motion';

const Path = (
  props: JSX.IntrinsicAttributes &
    SVGMotionProps<SVGPathElement> &
    React.RefAttributes<SVGPathElement>
) => (
  <motion.path
    fill="transparent"
    strokeWidth="5"
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
        <Path
          d="M 25 33 L 60 33"
          stroke="#FF0001"
          animate={currentState()}
          variants={{
            open: { rotate: '-45deg', translateY: '0px', stroke: '#fff' },
            hover: { d: 'M 25 33 L 55 33' },
          }}
          transition={{ duration: 0.1 }}
        />
        <Path
          d="M 25 45 L 60 45"
          stroke="#5EB89E"
          opacity={1}
          animate={currentState()}
          variants={{
            closed: { d: 'M 2 16.346 L 20 16.346', opacity: 1 },
            open: { d: 'M 0 35 L 0 35', opacity: 0 },
            hover: { d: 'M 20 35 L 50 35' },
          }}
        />
        <Path
          d="M 25 57 L 60 57"
          animate={currentState()}
          stroke="#F6A536"
          variants={{
            closed: { d: 'M 2 16.346 L 20 16.346' },
            open: { rotate: '45deg', translateY: '-23px', stroke: '#fff' },
            hover: { d: 'M 31 57 L 50 57' },
          }}
        />
      </svg>
    </motion.button>
  );
};
