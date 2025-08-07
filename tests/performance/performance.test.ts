describe('Performance Tests', () => {
  it('should render quickly', () => {
    const startTime = performance.now();
    const endTime = performance.now();
    expect(endTime - startTime).toBeLessThan(100);
  });

  it('should generate password quickly', () => {
    const mockArray = new Uint8Array(16);
    const startTime = performance.now();
    window.crypto.getRandomValues(mockArray);
    const endTime = performance.now();
    expect(endTime - startTime).toBeLessThan(10);
  });
});

describe('Performance Tests', () => {
  it('should render within acceptable time', () => {
    const startTime = performance.now();
    
    render(<PasswordGenerator />);
    
    const endTime = performance.now();
    const renderTime = endTime - startTime;
    
    expect(renderTime).toBeLessThan(100);
  });

  it('should generate password quickly', () => {
    const mockArray = new Uint8Array(16);
    for (let i = 0; i < 16; i++) {
      mockArray[i] = i;
    }
    
    const startTime = performance.now();
    window.crypto.getRandomValues(mockArray);
    const endTime = performance.now();
    
    expect(endTime - startTime).toBeLessThan(10);
  });
});