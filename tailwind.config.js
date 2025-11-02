import { createThemes } from 'tw-colors';
import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            fontFamily: {
                inter: ["'Inter'", "sans-serif"],
                gelasio: ["'Gelasio'", "serif"],
            },
            fontSize: {
                sm: "12px",
                base: "14px",
                xl: "16px",
                "2xl": "20px",
                "3xl": "28px",
                "4xl": "38px",
                "5xl": "50px",
            },
            typography: (theme) => ({
                DEFAULT: {
                    css: {
                        color: theme("colors.green.800"), // Default text color
                        a: {
                            color: theme("colors.logoGreen"), // Links
                            "&:hover": {
                                color: theme("colors.purple"), // Hover effect for links
                            },
                        },
                        h1: { color: theme("colors.black") },
                        h2: { color: theme("colors.black") },
                        h3: { color: theme("colors.black") },
                        strong: { color: theme("colors.black") }, // Strong text
                    },
                },
                dark: {
                    css: {
                        color: theme("colors.gray.200"), // Default text color for dark mode
                        a: {
                            color: theme("colors.logoGreen"),
                            "&:hover": {
                                color: theme("colors.purple"),
                            },
                        },
                        h1: { color: theme("colors.white") },
                        h2: { color: theme("colors.white") },
                        h3: { color: theme("colors.white") },
                        strong: { color: theme("colors.white") },
                    },
                },
            }),
        },
    },
    plugins: [
        createThemes({
            light: {
                white: "#FFFFFF",
                black: "#000000",
                grey: "#F3F3F3",
                "dark-grey": "#6B6B6B",
                red: "#FD1B1B",
                transparent: "transparent",
                twitter: "#1DA1F2",
                purple: "#8B46FF",
                logoGreen: "#A8EB12",
            },
            dark: {
                white: "#000000",
                black: "#F3F3F3",
                grey: "#2A2A2A",
                "dark-grey": "#E7E7E7",
                red: "#FD1B1B",
                transparent: "transparent",
                twitter: "#0E71A8",
                purple: "#582C8E",
                logoGreen: "#A8EB12",
            },
        }),
        typography, // Add the typography plugin here
    ],
};
