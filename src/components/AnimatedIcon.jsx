import './AnimatedIcon.css'

/**
 * AnimatedIcon
 * @param {string}  icon     - Material Symbols name  (e.g. "schedule")
 * @param {string}  variant  - "pulse" | "float" | "spin"
 * @param {string}  size     - "sm" | "md" | "lg"
 * @param {boolean} filled
 */
export default function AnimatedIcon({
  icon,
  variant = 'pulse',
  size = 'md',
  filled = false,
  className = '',
}) {
  const variantClass = {
    pulse: 'ai--pulse',
    float: 'ai--float',
    spin:  'ai--spin',
  }[variant] ?? ''

  return (
    <div className={`ai ai--${size} ${variantClass} ${className}`}>
      <span
        className={`material-symbols-outlined ${filled ? 'material-symbols-filled' : ''}`}
      >
        {icon}
      </span>
    </div>
  )
}
