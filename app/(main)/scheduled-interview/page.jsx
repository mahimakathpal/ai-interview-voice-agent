"use client"
import { supabase } from '@/services/supabaseClient'
import React, { useEffect, useState } from 'react'
import { useUser } from '@/app/provider';
import { Video } from 'lucide-react';
import { Button } from '@/components/ui/button';
import InterviewCard from '../dashboard/_components/InterviewCard';
import Link from 'next/link';

function ScheduleInterview() {
    const {user} = useUser();
    const [interviewList,setInterviewList] =  useState();
    useEffect(()=>{
        user && GetInterviewList();
    },[user])
    const GetInterviewList= async()=>{
        const result = await supabase.from('Interviews')
        .select('jobPosition, duration, interview_id, interview_feedback(userEmail)')
        .eq('userEmail',user?.email)
        .order('id', {ascending:false})
        console.log(result);
        setInterviewList(result.data);
    }
  return (
    <div className=''>
        <h2 className='font-bold text-2xl'>Interview List with Candidate feedback</h2>
          {interviewList?.length==0&&
           <Link
        href={"/dashboard/create-interview"}><div className ='p-5 flex flex-col gap-3 items-center mt-5 bg-white'>
        <Video className = 'h-10 w-10 text-primary'/>
        <h2>You don't have any interview created!</h2>
        <Button>+ Create New Interview</Button>
        </div>
        </Link>}
        {interviewList &&
         <div className='grid grid-cols-2 mt-5 xl:grid-cols-3 gap-5'>
          {interviewList?.map((interview,index)=>(
            <InterviewCard interview ={interview} key ={index}
            viewDetail={true} />
          ))}
         </div>
         }
 
    </div>
  )
}

export default ScheduleInterview
