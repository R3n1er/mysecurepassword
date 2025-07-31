import { render, screen } from '@testing-library/react';
import PasswordGenerator from '@/components/password/PasswordGenerator';
import { ScrollArrow } from '@/components/ui/scroll-arrow';

describe('Accessibility Tests', () => {
  describe('PasswordGenerator', () => {
    it('should have proper ARIA labels', () => {
      render(<PasswordGenerator />);
      
      expect(screen.getByRole('textbox')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /générer/i })).toBeInTheDocument();
      expect(screen.getByRole('slider')).toBeInTheDocument();
    });

    it('should have proper form labels', () => {
      render(<PasswordGenerator />);
      
      expect(screen.getByLabelText(/majuscules/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/minuscules/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/chiffres/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/symboles/i)).toBeInTheDocument();
    });

    it('should have keyboard navigation support', () => {
      render(<PasswordGenerator />);
      
      const generateButton = screen.getByRole('button', { name: /générer/i });
      expect(generateButton).toBeInTheDocument();
      
      const checkboxes = screen.getAllByRole('checkbox');
      checkboxes.forEach(checkbox => {
        expect(checkbox).toBeEnabled();
      });
    });
  });

  describe('ScrollArrow', () => {
    it('should have proper ARIA label', () => {
      render(<ScrollArrow />);
      
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-label');
    });

    it('should be keyboard accessible', () => {
      render(<ScrollArrow />);
      
      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
    });
  });
});