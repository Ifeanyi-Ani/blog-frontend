import Container from "react-bootstrap/esm/Container"
import Navbar from "../components/Navbar"
import { ReactNode } from "react"

function Layout({ children }: { children: React.ReactElement }): ReactNode {
  return (
    <Container fluid className="page-wrapper p-0">
      <Navbar />
      {children}
    </Container>
  )
}

export default Layout
