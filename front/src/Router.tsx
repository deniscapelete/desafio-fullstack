import { Route, Routes } from 'react-router-dom'
import { Home } from './pages/Home'
import { Plans } from './pages/Plans'
import { Payment } from './pages/Payment'

export function Router() {
  return (
    <Routes>
      <Route index path="/" element={<Home />} />
      <Route path="/plans/:userId" element={<Plans />} />
      <Route path="/pagamentos/:userId" element={<Payment />} />
    </Routes>
  )
}
