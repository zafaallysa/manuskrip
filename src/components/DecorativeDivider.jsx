export default function DecorativeDivider({ className = '' }) {
  return (
    <div className={`decorative-divider max-w-md mx-auto px-margin-mobile ${className}`}>
      <span className="material-symbols-outlined text-[20px]">star</span>
    </div>
  )
}