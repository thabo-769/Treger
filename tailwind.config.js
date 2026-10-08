/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,js,html}"],
  theme: {
    extend: {
      colors: {
        treger: "#E30613",
        ink: "#0A0A0B",
        coal: "#111113",
        smoke: "#1A1A1D"
      },
      fontFamily: {
        display: ["Archivo", "Inter", "sans-serif"],
        body: ["Inter", "sans-serif"]
      }
    }
  },
  plugins: []
}
