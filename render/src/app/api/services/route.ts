import { NextRequest, NextResponse } from 'next/server'
import Service from '@/models/Service'
import connectDB from '@/lib/mongodb'
import { verifyToken } from '@/lib/auth'

export async function GET(req: NextRequest) {
  try {
    await connectDB()
    
    // Verify token
    const userId = await verifyToken(req)
    if (!userId) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      )
    }
    
    // Get all services for the user
    const services = await Service.find({ userId }).sort({ createdAt: -1 })
    
    return NextResponse.json({ services })
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || 'Something went wrong' },
      { status: 500 }
    )
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB()
    
    // Verify token
    const userId = await verifyToken(req)
    if (!userId) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      )
    }
    
    const { repoUrl, buildCmd, startCmd } = await req.json()
    
    // Create new service
    const service = new Service({
      userId,
      repoUrl,
      buildCmd,
      startCmd,
      status: 'Queued',
    })
    
    await service.save()
    
    // Simulate deployment process
    simulateDeployment(service._id)
    
    return NextResponse.json({ service })
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || 'Something went wrong' },
      { status: 500 }
    )
  }
}

// Simulate deployment process
async function simulateDeployment(serviceId: string) {
  // In a real implementation, this would be handled by a background job processor
  // For now, we'll simulate the deployment flow with timeouts
  
  setTimeout(async () => {
    await Service.findByIdAndUpdate(serviceId, { status: 'Building' })
    
    setTimeout(async () => {
      // 80% chance of success, 20% chance of failure
      const isSuccess = Math.random() > 0.2
      
      if (isSuccess) {
        await Service.findByIdAndUpdate(serviceId, { status: 'Live' })
      } else {
        await Service.findByIdAndUpdate(serviceId, { 
          status: 'Failed', 
          error: 'Build failed: Missing dependencies' 
        })
      }
    }, 5000)
  }, 3000)
}