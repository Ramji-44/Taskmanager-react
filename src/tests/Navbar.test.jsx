import { render, screen, fireEvent } from "@testing-library/react"
import Navbar from "../components/Navbar/Navbar"

test(" render header content", () => {
  render(<Navbar />)

  expect(screen.getByText("TaskManager")).toBeInTheDocument()
  expect(screen.getByText("Dashboard")).toBeInTheDocument()
  expect(screen.getByText("Tasks")).toBeInTheDocument()
  expect(screen.getByText("Profile")).toBeInTheDocument()
})

test("toggle menu", () => {
  const { container } = render(<Navbar />)
  
  const menuBar = container.querySelector("div[class*='menuBar']")
  const nav = container.querySelector("nav")

  fireEvent.click(menuBar)
  expect(nav.className).toContain("showMenu")
})