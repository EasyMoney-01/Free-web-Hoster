'use client'

import { useState } from 'react'

interface NewServiceFormProps {
  onServiceCreated: () => void
  onCancel: () => void
}

export default function NewServiceForm({ onServiceCreated, onCancel }: NewServiceFormProps) {
  const [repoUrl, setRepoUrl] = useState('')
  const [buildCmd, setBuildCmd] = useState('npm run build')
  const [startCmd, setStartCmd] = useState('npm start')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    
    try {
      const token = localStorage.getItem('token')
      const res = await fetch('/api/services', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token || ''}`,
        },
        body: JSON.stringify({ repoUrl, buildCmd, startCmd }),
      })
      
      if (res.ok) {
        onServiceCreated()
      } else {
        const data = await res.json()
        setError(data.message || 'Failed to create service')
      }
    } catch (err) {
      setError('An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Create New Service</h2>
      
      {error && (
        <div className="rounded-md bg-red-50 p-4 mb-6">
          <div className="text-sm text-red-700">
            {error}
          </div>
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label htmlFor="repoUrl" className="block text-sm font-medium text-gray-700 mb-2">
            Repository URL
          </label>
          <input
            type="text"
            id="repoUrl"
            value={repoUrl}
            onChange={(e) => setRepoUrl(e.target.value)}
            placeholder="https://github.com/username/repo"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          />
          <p className="mt-1 text-sm text-gray-500">
            HTTPS clone URL for your Git repository
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label htmlFor="buildCmd" className="block text-sm font-medium text-gray-700 mb-2">
              Build Command
            </label>
            <input
              type="text"
              id="buildCmd"
              value={buildCmd}
              onChange={(e) => setBuildCmd(e.target.value)}
              placeholder="npm run build"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <div>
            <label htmlFor="startCmd" className="block text-sm font-medium text-gray-700 mb-2">
              Start Command
            </label>
            <input
              type="text"
              id="startCmd"
              value={startCmd}
              onChange={(e) => setStartCmd(e.target.value)}
              placeholder="npm start"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
        
        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={onCancel}
            className="bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 font-medium py-2 px-4 rounded-lg transition duration-300"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition duration-300 disabled:opacity-50"
          >
            {loading ? 'Creating...' : 'Create Service'}
          </button>
        </div>
      </form>
    </div>
  )
}