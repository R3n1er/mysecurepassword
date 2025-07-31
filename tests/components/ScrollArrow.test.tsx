import { render, screen, fireEvent } from '@testing-library/react';
import { ScrollArrow } from '@/components/ui/scroll-arrow';
import { ScrollToTop } from '@/components/navigation/ScrollToTop';

// Mock window.scrollTo
const mockScrollTo = vi.fn();
Object.defineProperty(window, 'scrollTo', {
  value: mockScrollTo,
  writable: true,
});

describe('ScrollArrow', () => {
  beforeEach(() => {
    mockScrollTo.mockClear();
    // Reset scroll position
    Object.defineProperty(window, 'pageYOffset', {
      value: 0,
      writable: true,
    });
  });

  it('should not be visible when scroll is below threshold', () => {
    render(<ScrollArrow threshold={300} />);
    
    const button = screen.getByRole('button');
    expect(button).toHaveClass('opacity-0');
  });

  it('should be visible when scroll is above threshold', () => {
    render(<ScrollArrow threshold={300} />);
    
    // Simulate scroll
    Object.defineProperty(window, 'pageYOffset', {
      value: 400,
      writable: true,
    });
    
    fireEvent.scroll(window);
    
    const button = screen.getByRole('button');
    expect(button).toHaveClass('opacity-100');
  });

  it('should scroll to top when clicked', () => {
    render(<ScrollArrow threshold={100} />);
    
    // Simulate scroll to make button visible
    Object.defineProperty(window, 'pageYOffset', {
      value: 200,
      writable: true,
    });
    fireEvent.scroll(window);
    
    const button = screen.getByRole('button');
    fireEvent.click(button);
    
    expect(mockScrollTo).toHaveBeenCalledWith({
      top: 0,
      behavior: 'smooth',
    });
  });

  it('should have correct accessibility attributes', () => {
    render(<ScrollArrow />);
    
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-label', 'Retour en haut de la page');
  });
});

describe('ScrollToTop', () => {
  beforeEach(() => {
    // Simulate scroll to make ScrollToTop visible
    Object.defineProperty(window, 'pageYOffset', {
      value: 400,
      writable: true,
    });
  });

  it('should render with different variants', () => {
    const { rerender } = render(<ScrollToTop variant="minimal" />);
    
    // Trigger scroll event to make component visible
    fireEvent.scroll(window);
    
    let button = screen.getByRole('button');
    expect(button).toHaveClass('bg-white/90');
    
    rerender(<ScrollToTop variant="progress" />);
    fireEvent.scroll(window);
    button = screen.getByRole('button');
    expect(button).toHaveClass('bg-gradient-to-r');
  });

  it('should render with different icons', () => {
    const { rerender } = render(<ScrollToTop icon="arrow" />);
    fireEvent.scroll(window);
    
    expect(screen.getByRole('button')).toBeInTheDocument();
    
    rerender(<ScrollToTop icon="double-chevron" />);
    fireEvent.scroll(window);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('should position correctly', () => {
    const { rerender } = render(<ScrollToTop position="bottom-left" />);
    fireEvent.scroll(window);
    
    let container = screen.getByRole('button').parentElement;
    expect(container).toHaveClass('bottom-8', 'left-8');
    
    rerender(<ScrollToTop position="bottom-center" />);
    fireEvent.scroll(window);
    container = screen.getByRole('button').parentElement;
    expect(container).toHaveClass('bottom-8', 'left-1/2');
  });
});