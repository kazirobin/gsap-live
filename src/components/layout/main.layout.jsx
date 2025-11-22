import React from 'react'
import { Outlet } from 'react-router'
import ProfessionalBackground from '../bg_animations/ProfessionalBackground'

const MainLayout = () => {
  return (
    <div className='relative'>
    <ProfessionalBackground/>
    <Outlet/>
    </div>
  )
}

export default MainLayout