import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import PropTypes from "prop-types";
export default function CustomSelect({ label, options, value, onChange }) {
  const parentRef = useRef(null);
  const [bgColor, setbgColor] = useState(null);
  // Prop Validation (since typescript is not being used)
  CustomSelect.propTypes = {
    label: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(
      PropTypes.shape({
        value: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
      })
    ).isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired, // New prop to handle state changes
  };

  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (selectedValue) => {
    onChange(selectedValue);
    setIsOpen(false);
  };

  // Getting the backgroud color of Parent Element
  useEffect(() => {
    if (parentRef.current) {
      let parentBgColor = "transparent";
      let parentElement = parentRef.current.parentElement; // First parent

      // Traverse up until we find a non-transparent background
      while (parentElement) {
        const computedStyle = getComputedStyle(parentElement);
        parentBgColor = computedStyle.backgroundColor;

        // Stop if we find a non-transparent background
        if (parentBgColor !== "rgba(0, 0, 0, 0)") {
          break;
        }
        parentElement = parentElement.parentElement; // Move to the next parent
      }
      setbgColor(parentBgColor);
    }
  }, []);

  // Variants for staggered effect
  const listVariants = {
    hidden: { opacity: 0, y: -5, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { staggerChildren: 0.1 }, // Stagger effect for child elements
    },
    exit: { opacity: 0, y: -5, scale: 0.95 },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.3 },
    }),
  };

  return (
    <div className="relative w-auto h-auto">
      {/* Outlined Fieldset Border */}
      <div
        ref={parentRef}
        className={`relative border rounded-sm p-4 bg-inherit cursor-pointer transition-all 
          ${
            isOpen || value
              ? "border-blue-600 border-2"
              : "border-gray-400 hover:border-gray-600"
          }`}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {/* Floating Label */}
        <motion.span
          initial={false}
          animate={{
            y: value || isOpen ? -30 : 0,
            scale: value || isOpen ? 0.85 : 1,
            color: value || isOpen ? "#3b82f6" : "#6b7280",
          }}
          transition={{
            ease: "easeOut",
            duration: 0.2,
          }}
          className="absolute left-3 px-1 text-gray-500 transition-all"
          style={{ backgroundColor: bgColor }}
        >
          {label}
        </motion.span>

        {/* Selected Value. Putting not breaking space as a fallback */}
        <span>
          {value ? options.find((opt) => opt.value === value)?.label : "\u00A0"}
        </span>

        {/* Dropdown Icon */}
        <span className="absolute right-3 top-1/2 -translate-y-1/2">▼</span>
      </div>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.ul
            variants={listVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg z-10"
          >
            {options.map((option, i) => (
              <motion.li
                key={option.value}
                variants={itemVariants}
                custom={i} // Pass index for stagger delay
                className="p-3 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleSelect(option.value)}
              >
                {option.label}
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
