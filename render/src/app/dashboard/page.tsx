'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Navbar from '@/components/Navbar'
import ServiceCard from '@/components/ServiceCard'
import NewServiceForm from '@/components/NewServiceForm'

interface Service {
  _id: string
  repoUrl: string
  buildCmd: string
  startCmd: string
  status: 'Queued' | 'Building' | 'Live' | 'Failed'
  createdAt: string
  error?: string
}

export default function Dashboard() {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [showNewServiceForm, setShowNewServiceForm] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      router.push('/login')
      return
    }
    
    fetchServices()
  }, [router])

  const fetchServices = async () => {
    try {
      const token = localStorage.getItem('token')
      const res = await fetch('/api/services', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
      
      if (res.ok) {
        const data = await res.json()
        setServices(data.services)
      } else if (res.status === 401) {
        localStorage.removeItem('token')
        router.push('/login')
      } else {
        setError('Failed to fetch services')
      }
    } catch (err) {
      setError('An error occurred while fetching services')
    } finally {
      setLoading(false)
    }
  }

  const handleServiceCreated = () => {
    setShowNewServiceForm(false)
    fetchServices()
  }

  const handleDeleteService = async (serviceId: string) => {
    try {
      const token = localStorage.getItem('token')
      const res = await fetch(`/api/services/${serviceId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
      
      if (res.ok) {
        fetchServices()
      } else {
        setError('Failed to delete service')
      }
    } catch (err) {
      setError('An error occurred while deleting service')
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

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <button
            onClick={() => setShowNewServiceForm(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
          >
            New Service
          </button>
        </div>
        
        {error && (
          <div className="rounded-md bg-red-50 p-4 mb-6">
            <div className="text-sm text-red-700">
              {error}
            </div>
          </div>
        )}
        
        {showNewServiceForm && (
          <div className="mb-8">
            <NewServiceForm 
              onServiceCreated={handleServiceCreated}
              onCancel={() => setShowNewServiceForm(false)}
            />
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <h3 className="text-xl font-medium text-gray-900 mb-2">No services yet</h3>
              <p className="text-gray-500 mb-6">Create your first service to get started</p>
              <button
                onClick={() => setShowNewServiceForm(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
              >
                Create Service
              </button>
            </div>
          ) : (
            services.map((service) => (
              <ServiceCard 
                key={service._id} 
                service={service} 
                onDelete={() => handleDeleteService(service._id)}
              />
            ))
          )}
        </div>
      </div>
    </div>
  )
}