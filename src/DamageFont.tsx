const gradients = {
  normal: ['red', 'yellow'],
  critical: ['red', 'magenta'],
  self: ['indigo', 'magenta'],
  selfCritical: ['black', 'magenta'],
} as const

type Gradient = keyof typeof gradients

type DamageFontProps = {
  value: number
  gradient: Gradient
  scale?: number
  zIndex: number
}

function DamageFont({ value, gradient, scale = 1, zIndex }: DamageFontProps) {
  const digits = String(value).split('')

  return (
    <div className="relative" style={{ transform: `scale(${scale})`, zIndex }}>
      {digits.map((n, i) => (
        <div
          key={`${i}`}
          className={`
              font-damage
              inline-block
              drop-shadow-pixel
              font-bold
              text-8xl
              leading-normal
              -mx-1.5
              -my-5
              transform
              ${i % 2 === 1 ? 'translate-y-2' : i === 0 && 'scale-125'}
            `}
          style={{
            color: 'transparent',
            WebkitTextFillColor: 'transparent',
            backgroundImage: `linear-gradient(to bottom, ${gradients[gradient][0]}, ${gradients[gradient][1]})`,
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            WebkitTextStrokeWidth: '4px',
            WebkitTextStrokeColor: 'white',
          }}
        >
          {n}
        </div>
      ))}
    </div>
  )
}

export default DamageFont
export type { Gradient }
export { gradients }
