import React, { useState } from 'react'
import { Inputs } from './Inputs'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../utils/axiosInstance'
import { API_PATHS } from '../utils/apiPaths'

const CreateResumeForm = () => {

  const [title, settitle] = useState("")
  const [error, seterror] = useState(null)
  const navigate = useNavigate()

  const handleCreateResume = async (e) => {
    e.preventDefault();

    if (!title) {
      seterror('Please enter resume title')
      return
    }
    seterror('')

    try {
      const response = await axiosInstance.post(API_PATHS.RESUME.CREATE, {
        title,
      })
      if (response.data?._id) {
        navigate(`/resume/${response.data?._id}`)
      }
    }
    catch (error) {
      if (error.response && error.response.data.message) {
        seterror(error.response.data.message)
      }
      else {
        seterror('Something went wrong. Please try again later.')
      }
    }
  }

  return (
    <div className='w-full'>
      <p className='text-stone-400 mb-6 font-medium'>
        Give your resume a title to get started. You can customise everything later.
      </p>

      <form onSubmit={handleCreateResume} className="space-y-4">
        <Inputs value={title} onChange={({ target }) => settitle(target.value)}
          label='Resume Title' placeholder='e.g. John Doe - Software Engineer' type='text' />

        {error && <p className='text-red-500 text-sm mb-4 font-medium'>{error}</p>}

        <button type='submit' className='w-full py-3 bg-gradient-to-r from-neon-pink to-neon-cyan text-white font-extrabold rounded-2xl hover:scale-105 hover:shadow-xl hover:shadow-neon-pink/20 transition-all'>
          Create Resume
        </button>
      </form>
    </div>
  )
}

export default CreateResumeForm
