import React, { useState } from 'react'
import { Inputs } from './Inputs'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../utils/axiosInstance'
import { API_PATHS } from '../utils/apiPaths'

const CreateResumeForm = ({ onSuccess }) => {
  const [title, settitle] = useState("")
  const [error, seterror] = useState(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleCreateResume = async (e) => {
    e.preventDefault();

    if (!title) {
      seterror('Please enter resume title')
      return
    }
    seterror('')
    setLoading(true)

    try {
      const response = await axiosInstance.post(API_PATHS.RESUME.CREATE, {
        title,
      })
      if (response.data?._id) {
        if (onSuccess) onSuccess();
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
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='w-full'>
      <p className='text-text-muted mb-6 font-medium text-sm'>
        Give your resume a title to get started. You can customise everything later.
      </p>

      <form onSubmit={handleCreateResume} className="space-y-4">
        <Inputs value={title} onChange={({ target }) => settitle(target.value)}
          label='Resume Title' placeholder='e.g. John Doe - Software Engineer' type='text' />

        {error && <p className='text-error text-sm mb-4 font-medium'>{error}</p>}

        <button 
          type='submit' 
          className='btn-primary w-full py-3'
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Resume"}
        </button>
      </form>
    </div>
  )
}

export default CreateResumeForm
