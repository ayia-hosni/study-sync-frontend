import { motion } from 'framer-motion';

export const CallToActionBanner: React.FC<CallToActionBannerProps> = ({
  onJoinClick,
}) => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      whileHover={{ scale: 1.02, rotate: 1 }}
      className="w-full h-[180px] relative flex items-center justify-between mb-8 p-8 rounded-3xl max-md:h-auto max-md:min-h-[160px] max-md:p-6 max-sm:flex-col max-sm:text-center max-sm:gap-6 max-sm:p-6 border border-border transition-all duration-500"
      style={{
        background: 'var(--gradient-primary)',
        boxShadow: 'var(--shadow-glow)',
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="flex-1"
      >
        <h2 className="text-xl font-bold text-primary-foreground mb-3 hover:scale-105 transition-transform duration-300">
          🚀 Ready to Study?
        </h2>
        <p className="text-primary-foreground/90 mb-6 text-base hover:text-primary-foreground transition-colors duration-300">
          You have an active match waiting. Join now to start your session!
        </p>
        <motion.button
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.1, y: -6 }}
          onClick={onJoinClick}
          className="px-8 py-3 flex items-center justify-center gap-3 bg-primary-foreground text-primary rounded-2xl font-semibold shadow-lg transition-all duration-300"
        >
          Join Study Room
          <motion.svg
            width="18"
            height="18"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="transition-transform duration-300"
            whileHover={{ x: 4 }}
          >
            <path
              d="M6 12L10 8L6 4"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </motion.svg>
        </motion.button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        whileHover={{ rotate: 45, scale: 1.2 }}
        className="absolute right-20 top-1/2 transform -translate-y-1/2 max-sm:relative max-sm:right-auto max-sm:top-auto max-sm:transform-none"
      >
        {/* Star SVG */}
      </motion.div>
    </motion.section>
  );
};
