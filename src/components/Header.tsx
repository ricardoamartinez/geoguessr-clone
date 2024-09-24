'use client';

import { motion } from 'framer-motion';

const Header = () => (
  <motion.header
    className="bg-blue-600 text-white p-4 shadow-md"
    initial={{ y: -50 }}
    animate={{ y: 0 }}
    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
  >
    <h1 className="text-3xl font-bold text-center">GeoGuessr Clone</h1>
  </motion.header>
);

export default Header;