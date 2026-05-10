import nextVitals from "eslint-config-next/core-web-vitals";

const eslintConfig = [
  {
    ignores: [
      ".next/**",
      "node_modules/**",
      "coverage/**",
      "dist/**",
      "tsconfig.tsbuildinfo",
    ],
  },
  ...nextVitals,
  {
    rules: {
      // Le projet utilise volontairement des effets de montage client
      // pour éviter les mismatches d'hydratation avec Next/App Router.
      "react-hooks/set-state-in-effect": "off",
    },
  },
  {
    files: ["tests/**/*.{ts,tsx}"],
    rules: {
      // Les tests mockent next/image avec <img>, ce n'est pas du code de prod.
      "@next/next/no-img-element": "off",
    },
  },
];

export default eslintConfig;
