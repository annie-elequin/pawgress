'use client'

import React from 'react'
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Text,
  useToast,
  Heading,
  Textarea,
} from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'

interface DogFormData {
  name: string
  breed: string
  age: string
  photo?: string
  notes?: string
}

interface PageParams {
  action: string
  id?: string
}

export default function DogFormPage({ params }: { params: PageParams }) {
  const router = useRouter()
  const toast = useToast()
  const { data: session } = useSession()
  const [isLoading, setIsLoading] = React.useState(false)
  const [dog, setDog] = React.useState<DogFormData>({
    name: '',
    breed: '',
    age: '',
    photo: '',
    notes: '',
  })

  React.useEffect(() => {
    if (params.action === 'edit' && params.id) {
      fetchDog()
    }
  }, [params.action, params.id])

  const fetchDog = async () => {
    try {
      const response = await fetch(`/api/dogs/${params.id}`)
      if (!response.ok) throw new Error('Failed to fetch dog')
      const data = await response.json()
      setDog({
        name: data.name,
        breed: data.breed,
        age: data.age.toString(),
        photo: data.photo || '',
        notes: data.notes || '',
      })
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to load dog',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const url = params.action === 'new' ? '/api/dogs' : `/api/dogs/${params.id}`
      const method = params.action === 'new' ? 'POST' : 'PUT'

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dog),
      })

      if (!response.ok) throw new Error('Failed to save dog')

      toast({
        title: 'Success',
        description: `Dog ${params.action === 'new' ? 'created' : 'updated'} successfully`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      })

      router.push('/dogs')
      router.refresh()
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to save dog',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setDog((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <Container maxW="container.sm" py={10}>
      <Stack spacing={8}>
        <Stack spacing={2}>
          <Heading>
            {params.action === 'new' ? 'Add New Dog' : 'Edit Dog'}
          </Heading>
          <Text color="gray.600">
            {params.action === 'new'
              ? 'Add a new dog to your training program'
              : 'Update your dog\'s information'}
          </Text>
        </Stack>

        <Box as="form" onSubmit={handleSubmit}>
          <Stack spacing={4}>
            <FormControl isRequired>
              <FormLabel>Name</FormLabel>
              <Input
                name="name"
                value={dog.name}
                onChange={handleChange}
                placeholder="Enter dog's name"
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Breed</FormLabel>
              <Input
                name="breed"
                value={dog.breed}
                onChange={handleChange}
                placeholder="Enter dog's breed"
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Age (years)</FormLabel>
              <Input
                name="age"
                type="number"
                value={dog.age}
                onChange={handleChange}
                placeholder="Enter dog's age"
              />
            </FormControl>

            <FormControl>
              <FormLabel>Photo URL</FormLabel>
              <Input
                name="photo"
                value={dog.photo}
                onChange={handleChange}
                placeholder="Enter photo URL (optional)"
              />
            </FormControl>

            <FormControl>
              <FormLabel>Notes</FormLabel>
              <Textarea
                name="notes"
                value={dog.notes}
                onChange={handleChange}
                placeholder="Enter any additional notes (optional)"
                rows={4}
              />
            </FormControl>

            <Stack direction="row" spacing={4}>
              <Button
                type="submit"
                colorScheme="blue"
                size="lg"
                isLoading={isLoading}
              >
                {params.action === 'new' ? 'Add Dog' : 'Save Changes'}
              </Button>
              <Button
                onClick={() => router.push('/dogs')}
                size="lg"
              >
                Cancel
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Container>
  )
} 