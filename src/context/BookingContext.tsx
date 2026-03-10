import { createContext, useContext, useState } from "react"
import type { ReactNode } from "react"

interface BookingContextType {
  isOpen: boolean
  initialCategoryId: string | null
  openBooking: (categoryId?: string) => void
  closeBooking: () => void
}

const BookingContext = createContext<BookingContextType>({
  isOpen: false,
  initialCategoryId: null,
  openBooking: () => {},
  closeBooking: () => {},
})

export function BookingProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [initialCategoryId, setInitialCategoryId] = useState<string | null>(null)

  const openBooking = (categoryId?: string) => {
    setInitialCategoryId(categoryId ?? null)
    setIsOpen(true)
    document.body.style.overflow = "hidden"
  }

  const closeBooking = () => {
    setIsOpen(false)
    document.body.style.overflow = ""
  }

  return (
    <BookingContext.Provider value={{ isOpen, initialCategoryId, openBooking, closeBooking }}>
      {children}
    </BookingContext.Provider>
  )
}

export const useBooking = () => useContext(BookingContext)
