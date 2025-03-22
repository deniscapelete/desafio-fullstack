import { Route, Routes } from 'react-router-dom'
import { Home } from './pages/Home'
import { Plans } from './pages/Plans'

export function Router() {
  return (
    <Routes>
      <Route index path="/" element={<Home />} />
      <Route path="/plans/:id" element={<Plans />} />
    </Routes>
  )
}
