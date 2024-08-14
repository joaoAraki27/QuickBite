/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}", // Adjust this according to your project structure
  ],
  theme: {
    extend: {
      // You can extend the default Tailwind theme here
      // For example, adding custom colors, spacing, etc.
      colors: {
        customColor: '#1c1c1e',
      },
    },
  },
  plugins: [
    // You can add Tailwind CSS plugins here
    // For example: require('@tailwindcss/forms'),
  ],
};
