import { BookingProvider } from "@/context/BookingContext"
import BookingModal from "@/components/ui/BookingModal"
import HomePage from "@/pages/HomePage"
import AuraChat from "@/components/ui/AuraChat"

export default function App() {
  return (
    <BookingProvider>
      <HomePage />
      <BookingModal />
      <AuraChat />
    </BookingProvider>
  )
}
