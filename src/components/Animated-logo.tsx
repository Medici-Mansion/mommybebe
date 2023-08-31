'use client'

import { easeInOut, motion, Variants } from 'framer-motion'

const draw: Variants = {
  hidden: {
    pathLength: 0,
    opacity: 0,
    strokeWidth: '1px',
    strokeDashoffset: 0,
  },
  visible: (i: number) => {
    const delay = 1 + i * 0.5
    return {
      pathLength: 1,
      stroke: 'black',
      strokeDasharray: 600,
      strokeDashoffset: 50,
      // strokeWidth: '0px',
      opacity: 1,
      transition: {
        pathLength: { delay, type: 'spring', duration: 1.5, bounce: 0 },
        opacity: { delay, duration: 1 },
        strokeWidth: { duration: 2 },
        strokeDasharray: { duration: 10, type: 'tween', ease: easeInOut },
        strokeDashoffset: { duration: 0.1, type: 'tween', ease: easeInOut },
      },
    }
  },
}

type Props = {}
const AnimatedLogo = (props: Props) => {
  return (
    <motion.svg
      width="130"
      height="145"
      viewBox="0 0 130 145"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      initial="hidden"
      animate="visible"
    >
      <motion.path
        variants={draw}
        d="M91.2565 83.1315C90.8914 85.5839 90.18 87.9241 89.1691 90.0957L119.338 115.566C126.19 105.148 130.131 92.6512 129.991 79.2281H95.8713C93.5873 79.2281 91.5935 80.8756 91.2565 83.1408V83.1315Z"
        fill="#CA75D2"
      />
      <motion.svg
        variants={draw}
        width="130"
        height="144"
        viewBox="0 0 130 144"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M58.8314 104.352C48.4692 101.572 40.5408 92.4734 39.6141 81.484C38.3785 66.8534 49.2649 54.3851 63.3338 53.2057H124.253C127.117 53.2057 129.448 50.8842 129.448 48.0199V47.9637C129.448 23.0926 110.624 2.63034 86.4451 0.0280946C83.665 -0.271445 81.2313 1.87213 81.2313 4.66159V16.9521C75.2031 15.4076 68.8472 14.6962 62.2761 14.9676C28.2503 16.353 0.823749 44.2944 0.0187377 78.3389C-0.73011 110.127 21.3609 136.889 51.034 143.386L58.8314 104.343V104.352Z"
          fill="#FFD200"
        />
        <path
          d="M103.968 41.5236C109.862 41.5236 114.639 36.746 114.639 30.8525C114.639 24.9591 109.862 20.1815 103.968 20.1815C98.0747 20.1815 93.2971 24.9591 93.2971 30.8525C93.2971 36.746 98.0747 41.5236 103.968 41.5236Z"
          fill="white"
        />
        <path
          d="M106.87 35.3269C109.341 35.3269 111.344 33.3237 111.344 30.8525C111.344 28.3814 109.341 26.3782 106.87 26.3782C104.399 26.3782 102.396 28.3814 102.396 30.8525C102.396 33.3237 104.399 35.3269 106.87 35.3269Z"
          fill="#FFD200"
        />
      </motion.svg>

      <motion.path
        variants={draw}
        d="M86.2392 94.9633C81.2781 101.478 73.3028 105.578 64.3916 105.194L56.5661 144.34C59.3275 144.696 62.1357 144.902 65 144.902C85.7056 144.902 104.137 135.214 116.043 120.125L86.2392 94.9633Z"
        fill="#F09336"
      />
    </motion.svg>
  )
}

export default AnimatedLogo
