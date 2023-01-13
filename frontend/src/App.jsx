import "./App.css"
import { useRoutes } from "react-router"
import Routes from "./routes"
import { Suspense } from "react"
import Loader from "./Components/assets/Loader"

function App() {
  const routes = useRoutes(Routes)
  return (
    <>
      <Suspense fallback={<Loader/>}>
       {routes}
      </Suspense>
    </>
  )
}

export default App