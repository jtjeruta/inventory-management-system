module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            keyframes: {
                wiggle: {
                    '0%': { transform: 'rotate(-2deg)' },
                    '25%': { transform: 'rotate(2deg)' },
                    '50%': { transform: 'rotate(-2deg)' },
                    '75%': { transform: 'rotate(2deg)' },
                    '100%': { transform: 'rotate(0deg)' },
                },
            },
            animation: {
                notif: 'wiggle 0.5s ease-in-out forwards',
            },
        },
    },
    plugins: [],
}
