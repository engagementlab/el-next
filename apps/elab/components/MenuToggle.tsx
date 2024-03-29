import * as React from 'react';
import { SVGMotionProps, cubicBezier, motion } from 'framer-motion';

const Path = (
  props: JSX.IntrinsicAttributes &
    SVGMotionProps<SVGPathElement> &
    React.RefAttributes<SVGPathElement>
) => (
  <motion.path
    className="origin-center"
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
      onTap={toggle}
      onHoverStart={hover}
      onHoverEnd={hover}
      whileTap={{
        scale: 1.2,
        transition: {
          ease: cubicBezier(0.075, 0.82, 0.165, 1.0),
          duration: 0.3,
        },
      }}
      whileHover={{
        scale: 1.03,
        transition: { duration: 0.3 },
      }}
      className="relative z-50"
      aria-label={isOpen ? 'Close Main Menu' : 'Open Main Menu'}
    >
      <svg width="75" height="75" viewBox="0 0 75 75">
        <Path
          d="M 25 33 L 60 33"
          stroke="#FF0001"
          animate={currentState()}
          variants={{
            open: {
              rotate: '-45deg',
              translateY: '10px',
              stroke: '#fff',
            },
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
            closed: { d: 'M 25 45 L 60 45', opacity: 1 },
            open: { translateX: '-4%', opacity: 0 },
            hover: { d: 'M 30 45 L 45 45' },
          }}
        />
        <Path
          d="M 25 57 L 60 57"
          animate={currentState()}
          stroke="#F6A536"
          variants={{
            closed: { d: 'M 2 16.346 L 20 16.346' },
            open: { rotate: '45deg', translateY: '-13px', stroke: '#fff' },
            hover: { d: 'M 31 57 L 50 57' },
          }}
        />
      </svg>
    </motion.button>
  );
};
