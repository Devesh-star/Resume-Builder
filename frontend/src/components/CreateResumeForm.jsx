import React, { useState } from 'react'
import {Inputs} from './Inputs'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../utils/axiosInstance'
import { API_PATHS } from '../utils/apiPaths'

const CreateResumeForm = () => {

  const [title, settitle] = useState("")
  const [error, seterror] = useState(null)
  const navigate = useNavigate()

  const handleCreateResume = async (e) => {
    e.preventDefault();

    if(!title){
      seterror('Please enter resume title')
      return
    }
    seterror('')

    try {
      const response = await axiosInstance.post(API_PATHS.RESUME.CREATE, {
        title,
      })
      if(response.data?._id){
        navigate(`/resume/${response.data?._id}`)
      }
    } 
    catch (error) {
      if(error.response && errorerror.response.data.message){
        seterror(error.response.data.message)
      }
      else {
        seterror('Something went wrong. Please try again later.')
      }
    }
  }

  return (
    <div className='w-full mx-w-md p-8 bg-zinc-900/50 rounded-2xl border border-zinc-800/80 shadow-lg backdrop-blur-sm'>
      <h3 className='text-2xl font-bold text-zinc-100 mb-2'>Create New Resume</h3>
      <p className='text-zinc-400 mb-8'>
        Give your resume a title to get started, You can customise evrything later.
      </p>

      <form onSubmit = {handleCreateResume}>
        <Inputs value={title} onChange={({target}) => settitle(target.value)}
        label='Resume Title' placeholder='e.g. John Doe - Software Engineer' type='text'/>

        {error && <p className='text-red-400 text-sm mb-4'>{error}</p>}

        <button type='submit' className='w-full py-3 bg-gradient-to-r from-cyan-500 to-violet-600 text-white font-extrabold rounded-2xl hover:scale-105 hover:shadow-xl hover:shadow-cyan-500/20 transition-all'>
          Create Resume
        </button>
      </form>
    </div>
  )
}

export default CreateResumeForm
