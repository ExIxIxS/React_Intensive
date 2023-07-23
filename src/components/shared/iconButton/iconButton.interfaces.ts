type ButtonSize = 'large' | 'medium' | 'small';

interface IconButtonProps {
  iconSrc: string;
  alt: string;
  handleClick: () => void;
  size?: ButtonSize;
}

export type { IconButtonProps };
