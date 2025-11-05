import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import User from '@/models/User'
import connectDB from '@/lib/mongodb'

export async function POST(req: NextRequest) {
  try {
    await connectDB()
    
    const { email, password } = await req.json()
    
    // Check if user already exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return NextResponse.json(
        { message: 'User already exists' },
        { status: 400 }
      )
    }
    
    // Create new user
    const user = new User({ email, password })
    await user.save()
    
    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || 'fallback_secret',
      { expiresIn: '7d' }
    )
    
    return NextResponse.json({
      token,
      user: {
        id: user._id,
        email: user.email,
      },
    })
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || 'Something went wrong' },
      { status: 500 }
    )
  }
}