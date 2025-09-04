import React from 'react'
import WelcomeContainer from './_components/WelcomeContainer'
import Provider from '@/app/provider'
import CreateOptions from './_components/CreateOptions'
import LatestInterviewsList from './_components/LatestInterviewsList'

function Dashboard() {
  return (
    <Provider>
    <div>
      <WelcomeContainer/>
      <h2 className= 'my-3 font-bold text-2xl'>Dashboard</h2>
      <CreateOptions/>
      <LatestInterviewsList/>
    </div>
    </Provider>
  )
}

export default Dashboard
