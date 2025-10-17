import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import React from 'react'
import { AppSidebar } from './_components/AppSidebar'
import WelcomeContainer from './dashboard/_components/WelcomeContainer'
import Provider from '@/app/provider'  

function DashboardProvider({children}) {
  return (
    <Provider>
    <SidebarProvider>
      <AppSidebar />
      <div className ='w-full p-5 mt-5'>
         {/* <SidebarTrigger/> */}
         <WelcomeContainer/>
        {children}
      </div>
    </SidebarProvider>
    </Provider>
  )
}

export default DashboardProvider
