import { NextRequest, NextResponse } from 'next/server'
import { ObjectId } from 'mongodb'
import Service from '@/models/Service'
import connectDB from '@/lib/mongodb'
import { verifyToken } from '@/lib/auth'

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
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
    
    // Validate service ID
    if (!ObjectId.isValid(params.id)) {
      return NextResponse.json(
        { message: 'Invalid service ID' },
        { status: 400 }
      )
    }
    
    // Get service
    const service = await Service.findOne({ _id: params.id, userId })
    
    if (!service) {
      return NextResponse.json(
        { message: 'Service not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json({ service })
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || 'Something went wrong' },
      { status: 500 }
    )
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
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
    
    // Validate service ID
    if (!ObjectId.isValid(params.id)) {
      return NextResponse.json(
        { message: 'Invalid service ID' },
        { status: 400 }
      )
    }
    
    // Delete service
    const service = await Service.findOneAndDelete({ _id: params.id, userId })
    
    if (!service) {
      return NextResponse.json(
        { message: 'Service not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json({ message: 'Service deleted successfully' })
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || 'Something went wrong' },
      { status: 500 }
    )
  }
}