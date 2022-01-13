module.exports = {
    mode: 'jit',
    content: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
            'smart-blue': '#52B0E0',
            'smart-green': '#2DFA91',
            'smart-teal': '#48C8C7',
            },
            fontFamily: {
                'sans': ['Source Sans Pro'],
                'display': ['Passion One']
            },
            container: {
                center: true,
            }
        },
    },
    plugins: [],
}
