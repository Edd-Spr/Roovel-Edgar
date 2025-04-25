import NavBar from "../../Components/NavBar"

export default function Layout({ children }) {
  return (
    <>
      <NavBar />
      <main style={{display: 'flex', overflow: 'hidden'}}>
        { children }
      </main>
    </>
  )
}
