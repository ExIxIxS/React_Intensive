import { render, screen, fireEvent, cleanup } from '@testing-library/react';

import IconButton from 'src/components/shared/iconButton';

describe('IconButton', () => {
  afterEach(() => {
    cleanup();
  });

  const handleClickMock = jest.fn();

  test('button renders correctly', () => {
    const iconSrc = 'path/to/icon.png';
    const altText = 'Icon Alt Text';
    render(<IconButton handleClick={handleClickMock} iconSrc={iconSrc} alt={altText} />);

    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toBeInTheDocument();

    const imageElement = screen.getByAltText(altText);
    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveAttribute('src', iconSrc);
  });

  test('calls handleClick prop when button is clicked', () => {
    const iconSrc = 'path/to/icon.png';
    const altText = 'Icon Alt Text';
    render(<IconButton handleClick={handleClickMock} iconSrc={iconSrc} alt={altText} />);

    const buttonElement = screen.getByRole('button');
    fireEvent.click(buttonElement);

    expect(handleClickMock).toHaveBeenCalledTimes(1);
  });
});
