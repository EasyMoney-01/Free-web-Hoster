'use client'

import { useState, useEffect } from 'react'

interface LogEntry {
  timestamp: string
  message: string
}

interface LogsPanelProps {
  serviceId: string
}

export default function LogsPanel({ serviceId }: LogsPanelProps) {
  const [logs, setLogs] = useState<LogEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [autoRefresh, setAutoRefresh] = useState(true)

  useEffect(() => {
    fetchLogs()
    
    let interval: NodeJS.Timeout
    if (autoRefresh) {
      interval = setInterval(fetchLogs, 5000)
    }
    
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [serviceId, autoRefresh])

  const fetchLogs = async () => {
    try {
      // In a real implementation, this would fetch actual logs from an API
      // For now, we'll simulate log entries
      const newLogs = [
        { timestamp: new Date().toISOString(), message: 'Starting deployment process...' },
        { timestamp: new Date().toISOString(), message: 'Cloning repository...' },
        { timestamp: new Date().toISOString(), message: 'Installing dependencies...' },
        { timestamp: new Date().toISOString(), message: 'Building application...' },
        { timestamp: new Date().toISOString(), message: 'Starting server...' },
        { timestamp: new Date().toISOString(), message: 'Service is now live!' },
      ]
      
      setLogs(newLogs)
    } catch (err) {
      console.error('Failed to fetch logs:', err)
    } finally {
      setLoading(false)
    }
  }

  const toggleAutoRefresh = () => {
    setAutoRefresh(!autoRefresh)
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="border-b border-gray-200 p-4 flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">Deployment Logs</h3>
        <button
          onClick={toggleAutoRefresh}
          className={`text-sm px-3 py-1 rounded ${autoRefresh ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}
        >
          {autoRefresh ? 'Auto-refresh ON' : 'Auto-refresh OFF'}
        </button>
      </div>
      
      <div className="p-4">
        {loading ? (
          <div className="flex justify-center items-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm">
            <div className="h-64 overflow-y-auto">
              {logs.map((log, index) => (
                <div key={index} className="text-green-400 mb-1">
                  <span className="text-gray-500 mr-2">
                    {new Date(log.timestamp).toLocaleTimeString()}
                  </span>
                  {log.message}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}