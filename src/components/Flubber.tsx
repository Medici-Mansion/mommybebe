'use client'

import { useEffect, useState } from 'react'
import {
  ORANGE_BODY_LARGE,
  ORANGE_BODY_SMALL,
  PURPLE_BODY_LARGE,
  PURPLE_BODY_SMALL,
  YELLOW_BODY_LARGE,
  YELLOW_BODY_SMALL,
} from '../hooks/paths'
import { motion, useMotionValue, animate } from 'framer-motion'
import { useFlubber } from '../hooks/use-flubber'

export default function Flubber() {
  const [pathIndex, setPathIndex] = useState(0)
  const progress = useMotionValue(pathIndex)

  const yellow = useFlubber(progress, [
    YELLOW_BODY_LARGE,
    YELLOW_BODY_SMALL,
    YELLOW_BODY_SMALL,
    YELLOW_BODY_LARGE,
  ])
  const orange = useFlubber(progress, [
    ORANGE_BODY_SMALL,
    ORANGE_BODY_LARGE,
    ORANGE_BODY_SMALL,
    ORANGE_BODY_SMALL,
  ])
  const purple = useFlubber(progress, [
    PURPLE_BODY_SMALL,
    PURPLE_BODY_SMALL,
    PURPLE_BODY_LARGE,
    PURPLE_BODY_SMALL,
  ])

  useEffect(() => {
    const animation = animate(progress, pathIndex, {
      duration: 0.8,
      ease: 'easeInOut',
      onComplete: () => {
        if (pathIndex === 3) {
          progress.set(0)
          setPathIndex(1)
        } else {
          setPathIndex(pathIndex + 1)
        }
      },
    })

    return () => animation.stop()
  }, [pathIndex, progress])

  return (
    <svg width="138" height="154" viewBox="0 0 138 154" fill="none">
      <motion.g
        initial={{ rotateZ: '0deg' }}
        animate={{
          rotateZ: '360deg',
          transition: {
            repeat: Infinity,
            duration: 3,
          },
        }}
      >
        <g>
          <motion.path fill="#F9D203" d={yellow} />
        </g>
        <g fill="#F09336" transform="translate(57 100)">
          <motion.path d={orange} />
        </g>
        <g fill="#CA75D2" transform="translate(90 88)">
          <motion.path d={purple} />
        </g>
      </motion.g>
    </svg>
  )
}
