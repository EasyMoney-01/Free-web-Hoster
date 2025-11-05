import { NextRequest } from 'next/server'
import jwt from 'jsonwebtoken'
import User from '@/models/User'

export async function verifyToken(req: NextRequest): Promise<string | null> {
  try {
    const authHeader = req.headers.get('authorization')
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return null
    }
    
    const token = authHeader.split(' ')[1]
    
    if (!token) {
      return null
    }
    
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret')
    
    // Check if user still exists
    const user = await User.findById(decoded.userId)
    if (!user) {
      return null
    }
    
    return decoded.userId
  } catch (error) {
    return null
  }
}