import NavBar from "../../Components/NavBar"

export default function Layout({ children }) {
  return (
    <>
      <NavBar />
      <main style={{display: 'flex', flexWrap: 'wrap', overflowX: 'hidden', height: 'auto'}}>
        { children }
      </main>
    </>
  )
}
