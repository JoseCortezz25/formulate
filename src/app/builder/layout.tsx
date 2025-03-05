import Navbar from '@/components/layout/navbar'
import React, { ReactNode } from 'react'

const BuilderLayout = ({
  children
}: { children: ReactNode }) => {
  return (
    <div>
      {/* <Navbar /> */}
      {children}
    </div>
  )
}

export default BuilderLayout