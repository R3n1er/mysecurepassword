import { describe, it, expect } from 'vitest';
import { env, validateEnv } from '@/config/env';

describe('Environment Configuration', () => {
  it('has required environment variables', () => {
    expect(env.SUPABASE_URL).toBeDefined();
    expect(env.SUPABASE_ANON_KEY).toBeDefined();
    expect(env.APP_URL).toBeDefined();
  });

  it('validates environment successfully', () => {
    expect(() => validateEnv()).not.toThrow();
  });

  it('has default values for optional variables', () => {
    expect(env.APP_URL).toBe('http://localhost:3000');
  });
});