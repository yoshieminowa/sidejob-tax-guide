import nextVitals from "eslint-config-next/core-web-vitals";

const eslintConfig = [
  ...nextVitals,
  {
    ignores: [".next/**", ".test-dist/**", "node_modules/**", "out/**"]
  }
];

export default eslintConfig;
