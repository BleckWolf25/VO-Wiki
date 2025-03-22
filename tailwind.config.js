/** @type {import('tailwindcss').Config} */
export const content = [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
];
export const darkMode = 'class';

export const theme = {
    extend: {
        colors: {
            primary: '#1DA1F2',
            secondary: '#14171A',
            accent: '#FF5733',
        },
    },
};
export const plugins = [];