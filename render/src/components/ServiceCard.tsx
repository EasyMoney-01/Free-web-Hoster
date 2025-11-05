'use client'

import Link from 'next/link'

interface Service {
  _id: string
  repoUrl: string
  buildCmd: string
  startCmd: string
  status: 'Queued' | 'Building' | 'Live' | 'Failed'
  createdAt: string
  error?: string
}

interface ServiceCardProps {
  service: Service
  onDelete: () => void
}

export default function ServiceCard({ service, onDelete }: ServiceCardProps) {
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
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-1">
              {service.repoUrl.split('/').pop()}
            </h3>
            <p className="text-sm text-gray-500 truncate max-w-xs">
              {service.repoUrl}
            </p>
          </div>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(service.status)}`}>
            {service.status}
          </span>
        </div>
        
        <div className="mt-4 flex items-center text-sm text-gray-500">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>
            {new Date(service.createdAt).toLocaleDateString()}
          </span>
        </div>
        
        {service.error && (
          <div className="mt-3 text-sm text-red-600">
            Error: {service.error}
          </div>
        )}
        
        <div className="mt-6 flex space-x-3">
          <Link 
            href={`/service/${service._id}`}
            className="flex-1 text-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition duration-300"
          >
            View Details
          </Link>
          <button
            onClick={onDelete}
            className="flex-1 text-center bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 font-medium py-2 px-4 rounded-lg transition duration-300"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}