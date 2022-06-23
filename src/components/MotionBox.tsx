import { Box, type BoxProps } from '@chakra-ui/react';
import { motion } from 'framer-motion';

const MotionBox = motion<Omit<BoxProps, 'transition'>>(Box);

export default MotionBox;
