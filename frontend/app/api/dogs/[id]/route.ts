import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { PrismaClient } from '@prisma/client'
import { authOptions } from '../../auth/[...nextauth]/route'

const prisma = new PrismaClient()

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      )
    }

    const dog = await prisma.dog.findFirst({
      where: {
        id: params.id,
        userId: session.user.id,
      },
    })

    if (!dog) {
      return NextResponse.json(
        { message: 'Dog not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(dog)
  } catch (error) {
    console.error('Error fetching dog:', error)
    return NextResponse.json(
      { message: 'Something went wrong' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { name, breed, age, photo, notes } = body

    const dog = await prisma.dog.findFirst({
      where: {
        id: params.id,
        userId: session.user.id,
      },
    })

    if (!dog) {
      return NextResponse.json(
        { message: 'Dog not found' },
        { status: 404 }
      )
    }

    const updatedDog = await prisma.dog.update({
      where: {
        id: params.id,
      },
      data: {
        name,
        breed,
        age: parseInt(age),
        photo,
        notes,
      },
    })

    return NextResponse.json(updatedDog)
  } catch (error) {
    console.error('Error updating dog:', error)
    return NextResponse.json(
      { message: 'Something went wrong' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      )
    }

    const dog = await prisma.dog.findFirst({
      where: {
        id: params.id,
        userId: session.user.id,
      },
    })

    if (!dog) {
      return NextResponse.json(
        { message: 'Dog not found' },
        { status: 404 }
      )
    }

    await prisma.dog.delete({
      where: {
        id: params.id,
      },
    })

    return NextResponse.json(
      { message: 'Dog deleted successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error deleting dog:', error)
    return NextResponse.json(
      { message: 'Something went wrong' },
      { status: 500 }
    )
  }
} 