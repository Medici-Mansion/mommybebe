'use client'
import { Variants, cubicBezier, motion } from 'framer-motion'
import Image from 'next/image'
import { useState } from 'react'
interface CardProps {
  image: string
  isShow: boolean
  isCorrect?: boolean | null
  direction: 'left' | 'right'
}
const imageVariants: Variants = {
  initial: {
    scale: 0.7,
  },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      scale: {
        delay: 0.2,
      },
    },
  },
  exit: (direction: 'left' | 'right') => ({
    zIndex: 50,
    rotateZ: direction === 'right' ? '15deg' : '-15deg',
    x: direction === 'right' ? 500 : -500,
  }),
}

const correctVariants: Variants = {
  initial: {
    scale: 1,
    y: 0,
  },
  animate: {
    opacity: 1,
    scale: 0.7,
    y: -100,
    rotateZ: '360deg',
    transition: {
      y: {
        duration: 0.5,

        repeat: 3,
        repeatType: 'reverse',
        type: 'tween',

        ease: cubicBezier(0.95, 0.05, 0.795, 0.035),
      },
      scale: {
        duration: 0.5,

        repeat: 3,
        repeatType: 'reverse',
        type: 'tween',

        ease: cubicBezier(0.95, 0.05, 0.795, 0.035),
      },
      rotateZ: {
        duration: 0.5,
        type: 'tween',
        ease: cubicBezier(0.95, 0.05, 0.05, 0.095),
      },
    },
  },
  exit: (direction: 'left' | 'right') => ({
    rotateZ: direction === 'right' ? '15deg' : '-15deg',
    x: direction === 'right' ? 500 : -500,
    transition: {
      delay: 3,
    },
  }),
}

const completeVariatns: Variants = {
  animate: {
    scale: 1,
    y: 0,
    transition: {
      duration: 10,
    },
  },
  exit: (direction: 'left' | 'right') => ({
    rotateZ: direction === 'right' ? '15deg' : '-15deg',
    x: direction === 'right' ? 500 : -500,
    transition: {
      delay: 3,
    },
  }),
}
const ServerImage = motion(Image)
const Card = ({ image, isCorrect, direction }: CardProps) => {
  const [variants, setVariants] = useState(
    isCorrect === undefined
      ? imageVariants
      : isCorrect
      ? correctVariants
      : imageVariants,
  )
  return (
    <motion.div
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      custom={direction}
      style={{
        position: 'absolute',
        width: '100%',
        borderRadius: '2rem',
        overflow: 'hidden',
      }}
      onAnimationComplete={(event) => {
        if (event === 'animate' && isCorrect) {
          setVariants(completeVariatns)
        }
      }}
    >
      <div style={{ position: 'relative', width: '100%', aspectRatio: 1 / 1 }}>
        <ServerImage src={image} alt="image" fill />
      </div>
    </motion.div>
  )
}

export default Card
