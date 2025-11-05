'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Navbar from '@/components/Navbar'
import LogsPanel from '@/components/LogsPanel'

interface Service {
  _id: string
  repoUrl: string
  buildCmd: string
  startCmd: string
  status: 'Queued' | 'Building' | 'Live' | 'Failed'
  createdAt: string
  error?: string
}

export default function ServiceDetail() {
  const [service, setService] = useState<Service | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const router = useRouter()
  const params = useParams()
  const serviceId = params.id as string

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      router.push('/login')
      return
    }
    
    if (serviceId) {
      fetchService()
    }
  }, [serviceId, router])

  const fetchService = async () => {
    try {
      const token = localStorage.getItem('token')
      const res = await fetch(`/api/services/${serviceId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
      
      if (res.ok) {
        const data = await res.json()
        setService(data.service)
      } else if (res.status === 401) {
        localStorage.removeItem('token')
        router.push('/login')
      } else {
        setError('Failed to fetch service')
      }
    } catch (err) {
      setError('An error occurred while fetching service')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 py-16">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </div>
    )
  }

  if (!service) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Service not found</h2>
            <button
              onClick={() => router.push('/dashboard')}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    )
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Live': return 'bg-green-100 text-green-800'
      case 'Building': return 'bg-yellow-100 text-yellow-800'
      case 'Queued': return 'bg-blue-100 text-blue-800'
      case 'Failed': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <button
            onClick={() => router.push('/dashboard')}
            className="text-blue-600 hover:text-blue-800 flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back to Dashboard
          </button>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">{service.repoUrl.split('/').pop()}</h1>
              <div className="flex items-center">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(service.status)}`}>
                  {service.status}
                </span>
                {service.error && (
                  <span className="ml-2 text-sm text-red-600">{service.error}</span>
                )}
              </div>
            </div>
            <div className="mt-4 md:mt-0">
              <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300">
                Redeploy
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">Repository</h3>
              <p className="text-gray-600 break-all">{service.repoUrl}</p>
              
              <h3 className="text-lg font-medium text-gray-900 mt-6 mb-3">Build Command</h3>
              <p className="text-gray-600 font-mono bg-gray-100 p-3 rounded">{service.buildCmd}</p>
              
              <h3 className="text-lg font-medium text-gray-900 mt-6 mb-3">Start Command</h3>
              <p className="text-gray-600 font-mono bg-gray-100 p-3 rounded">{service.startCmd}</p>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">Environment</h3>
              <div className="bg-gray-100 p-3 rounded">
                <p className="text-gray-600">NODE_VERSION: 18</p>
              </div>
              
              <h3 className="text-lg font-medium text-gray-900 mt-6 mb-3">Created At</h3>
              <p className="text-gray-600">
                {new Date(service.createdAt).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
        
        <LogsPanel serviceId={serviceId} />
      </div>
    </div>
  )
}