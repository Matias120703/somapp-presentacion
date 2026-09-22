interface Props {
  size?: number;
  className?: string;
}

/*
 * Monochrome mark — inherits `currentColor`, so it reads correctly
 * on paper (ink) and on ink (paper) without extra props.
 */
export default function SomappLogo({ size = 36, className = "" }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <polygon
        points="50,6 88,28 88,72 50,94 12,72 12,28"
        stroke="currentColor"
        strokeWidth="4"
        fill="none"
        strokeLinejoin="round"
      />
      <path
        d="M 63,30 C 63,21 37,21 37,30 C 37,41 63,59 63,70 C 63,79 37,79 37,70"
        stroke="currentColor"
        strokeWidth="6.5"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}
