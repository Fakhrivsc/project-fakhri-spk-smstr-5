import React from 'react';

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled = false,
  iconLeft: IconLeft = null,
  iconRight: IconRight = null,
  type = 'button',
  onClick,
  className = '',
  ...props
}) {
  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      onClick={onClick}
      className={`btn btn-${variant} btn-${size} ${className}`}
      {...props}
    >
      {isLoading ? (
        <span className="btn-spinner" aria-hidden="true" />
      ) : (
        IconLeft && <IconLeft size={size === 'sm' ? 14 : 18} />
      )}
      <span>{children}</span>
      {!isLoading && IconRight && <IconRight size={size === 'sm' ? 14 : 18} />}
    </button>
  );
}
