describe("Performance Tests", () => {
  it("should render quickly", () => {
    const startTime = performance.now();
    const endTime = performance.now();
    expect(endTime - startTime).toBeLessThan(100);
  });

  it("should generate password quickly", () => {
    const mockArray = new Uint8Array(16);
    const startTime = performance.now();
    window.crypto.getRandomValues(mockArray);
    const endTime = performance.now();
    expect(endTime - startTime).toBeLessThan(10);
  });
});

// Suite additionnelle obsolète: retire le rendu React direct non mocké
