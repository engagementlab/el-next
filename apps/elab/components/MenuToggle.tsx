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
    strokeLinecap="round"
    {...props}
  />
);

export const MenuToggle = ({ toggle, hover, isHover }: any) => {
  // console.log(isHover);
  return (
    <motion.button
      onClick={toggle}
      onHoverStart={hover}
      onHoverEnd={hover}
      whileHover={{
        scale: 1.2,
        transition: { duration: 0.3 },
      }}
      className="relative z-50"
    >
      <svg
        width="50"
        height="50"
        viewBox="0 0 50 50"
        className="border-2 border-violet-700"
      >
        <motion.circle
          cx="25"
          cy="25"
          r="20"
          fill="red"
          animate={isHover ? 'hover' : 'default'}
          variants={{
            default: { fill: 'red' },
            hover: { fill: 'black' },
          }}
          transition={{ duration: 0.3 }}
        />
        <Path
          variants={{
            closed: { d: 'M 2 2.5 L 20 2.5' },
            open: { d: 'M 3 16.5 L 17 2.5' },
          }}
        />
        <Path
          d="M 2 9.423 L 20 9.423"
          variants={{
            closed: { opacity: 1 },
            open: { opacity: 0 },
          }}
          transition={{ duration: 0.1 }}
        />
        <Path
          variants={{
            closed: { d: 'M 2 16.346 L 20 16.346' },
            open: { d: 'M 3 2.5 L 17 16.346' },
          }}
        />
      </svg>
    </motion.button>
  );
};
