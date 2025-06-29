export function HeartIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 24 24"
      width="20"
      height="20"
      style={{ marginRight: 6 }}
    >
      <path
        d="M12 21.35l-1.45-1.32C5.4 15.36 
        2 12.28 2 8.5 2 5.42 4.42 3 7.5 
        3c1.74 0 3.41 0.81 4.5 
        2.09C13.09 3.81 14.76 3 16.5 
        3 19.58 3 22 5.42 22 8.5c0 
        3.78-3.4 6.86-8.55 11.54L12 21.35z"
      />
    </svg>
  );
}

export function SpinnerIcon() {
  return (
    <svg
      className="animate-spin"
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      fill="none"
      viewBox="0 0 24 24"
      style={{ marginRight: 6 }}
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 
          0 5.373 0 12h4z"
      />
    </svg>
  );
}
