import { render, cleanup } from '@testing-library/react';
import App from 'src/components/ui/app';

describe('App', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders the app component', () => {
    const { container } = render(<App />);
    const headerElement = container.querySelector('header');
    const mainElement = container.querySelector('main');

    expect(headerElement).toBeInTheDocument();
    expect(mainElement).toBeInTheDocument();
  });
});
