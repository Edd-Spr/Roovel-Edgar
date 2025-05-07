import NavBar from "../../Components/NavBar"

export default function Layout({ children, height='auto', width='100%' }) {
  return (
    <>
      <NavBar />
      <main style={{display: 'flex', flexWrap: 'wrap', overflowX: 'hidden', height: height, width: width}}>
        { children }
      </main>
    </>
  )
}
