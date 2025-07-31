import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import PasswordGenerator from '@/components/password/PasswordGenerator';

// Mock crypto API
const mockGetRandomValues = vi.fn();
Object.defineProperty(window, 'crypto', {
  value: { getRandomValues: mockGetRandomValues },
  writable: true,
});

// Mock clipboard API
const mockWriteText = vi.fn();
Object.defineProperty(navigator, 'clipboard', {
  value: { writeText: mockWriteText },
  writable: true,
});

describe('PasswordGenerator', () => {
  beforeEach(() => {
    mockGetRandomValues.mockClear();
    mockWriteText.mockClear();
    
    // Mock crypto.getRandomValues to return predictable values
    mockGetRandomValues.mockImplementation((array: Uint8Array) => {
      for (let i = 0; i < array.length; i++) {
        array[i] = i % 256;
      }
      return array;
    });
  });

  it('should render with initial state', () => {
    render(<PasswordGenerator />);
    
    expect(screen.getByText('MySecurePassword')).toBeInTheDocument();
    expect(screen.getByText('Mot de passe généré')).toBeInTheDocument();
    expect(screen.getByText('Configuration')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /générer/i })).toBeInTheDocument();
  });

  it('should generate password when button is clicked', async () => {
    render(<PasswordGenerator />);
    
    const generateButton = screen.getByRole('button', { name: /générer/i });
    fireEvent.click(generateButton);
    
    await waitFor(() => {
      const input = screen.getByRole('textbox');
      expect((input as HTMLInputElement).value.length).toBeGreaterThan(0);
    });
  });

  it('should copy password to clipboard', async () => {
    render(<PasswordGenerator />);
    
    // Generate password first
    const generateButton = screen.getByRole('button', { name: /générer/i });
    fireEvent.click(generateButton);
    
    await waitFor(() => {
      const input = screen.getByRole('textbox');
      expect((input as HTMLInputElement).value).toBeTruthy();
    });
    
    // Click copy button (find by position)
    const buttons = screen.getAllByRole('button');
    const copyButton = buttons[1]; // Second button is copy
    fireEvent.click(copyButton);
    
    await waitFor(() => {
      expect(mockWriteText).toHaveBeenCalled();
    });
  });

  it('should update password length', async () => {
    render(<PasswordGenerator />);
    
    const lengthSlider = screen.getByRole('slider');
    fireEvent.change(lengthSlider, { target: { value: '20' } });
    
    // Generate password to test new length
    const generateButton = screen.getByRole('button', { name: /générer/i });
    fireEvent.click(generateButton);
    
    await waitFor(() => {
      const input = screen.getByRole('textbox');
      expect((input as HTMLInputElement).value.length).toBe(20);
    });
  });

  it('should toggle character options', async () => {
    render(<PasswordGenerator />);
    
    const uppercaseCheckbox = screen.getByLabelText(/majuscules/i);
    expect(uppercaseCheckbox).toBeChecked();
    
    fireEvent.click(uppercaseCheckbox);
    expect(uppercaseCheckbox).not.toBeChecked();
  });

  it('should toggle Google Workspace compatibility', async () => {
    render(<PasswordGenerator />);
    
    const googleCheckbox = screen.getByLabelText(/google workspace/i);
    expect(googleCheckbox).not.toBeChecked();
    
    fireEvent.click(googleCheckbox);
    expect(googleCheckbox).toBeChecked();
  });

  it('should regenerate password when options change', async () => {
    render(<PasswordGenerator />);
    
    // Generate initial password
    const generateButton = screen.getByRole('button', { name: /générer/i });
    fireEvent.click(generateButton);
    
    await waitFor(() => {
      const input = screen.getByRole('textbox');
      expect((input as HTMLInputElement).value).toBeTruthy();
    });
    
    const initialPassword = (screen.getByRole('textbox') as HTMLInputElement).value;
    
    // Change length option to trigger regeneration
    const lengthSlider = screen.getByRole('slider');
    fireEvent.change(lengthSlider, { target: { value: '20' } });
    
    await waitFor(() => {
      const input = screen.getByRole('textbox');
      const newPassword = (input as HTMLInputElement).value;
      expect(newPassword.length).toBe(20);
    });
  });

  it('should handle crypto API failure gracefully', async () => {
    // Mock crypto API to throw error
    mockGetRandomValues.mockImplementation(() => {
      throw new Error('Crypto API not available');
    });
    
    // Mock Math.random for fallback
    const mockMathRandom = vi.spyOn(Math, 'random');
    mockMathRandom.mockReturnValue(0.5);
    
    render(<PasswordGenerator />);
    
    const generateButton = screen.getByRole('button', { name: /générer/i });
    fireEvent.click(generateButton);
    
    await waitFor(() => {
      const input = screen.getByRole('textbox');
      expect((input as HTMLInputElement).value).toBeTruthy();
    });
    
    mockMathRandom.mockRestore();
  });

  it('should show loading state during generation', async () => {
    render(<PasswordGenerator />);
    
    const generateButton = screen.getByRole('button', { name: /générer/i });
    fireEvent.click(generateButton);
    
    // Should show loading state briefly
    expect(screen.getByText(/génération/i)).toBeInTheDocument();
    
    await waitFor(() => {
      expect(screen.queryByText(/génération/i)).not.toBeInTheDocument();
    });
  });
});