import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import User from '@/models/User'
import connectDB from '@/lib/mongodb'

export async function POST(req: NextRequest) {
  try {
    await connectDB()
    
    const { email, password } = await req.json()
    
    // Find user
    const user = await User.findOne({ email })
    if (!user) {
      return NextResponse.json(
        { message: 'Invalid credentials' },
        { status: 401 }
      )
    }
    
    // Check password
    const isPasswordValid = await user.comparePassword(password)
    if (!isPasswordValid) {
      return NextResponse.json(
        { message: 'Invalid credentials' },
        { status: 401 }
      )
    }
    
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