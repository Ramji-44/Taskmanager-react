import { render, screen } from "@testing-library/react"
import App from "../App"

test("render H1 as Task Dashboard", () => {
    render(<App />)  // renders app component
    const heading = screen.getByRole('heading', { level: 1, name: "Task Dashboard" })
    expect(heading).toBeInTheDocument()

    expect(screen.getByRole("main")).toBeInTheDocument()   // main tag
})
