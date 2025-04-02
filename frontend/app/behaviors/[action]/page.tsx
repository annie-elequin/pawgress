'use client'

import React from 'react'
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Textarea,
  useToast,
} from '@chakra-ui/react'
import { useRouter } from 'next/navigation'

interface BehaviorFormData {
  title: string
  description: string
  category: string
}

interface PageParams {
  action: string
  id?: string
}

export default function BehaviorFormPage({ params }: { params: PageParams }) {
  const router = useRouter()
  const toast = useToast()
  const [formData, setFormData] = React.useState<BehaviorFormData>({
    title: '',
    description: '',
    category: '',
  })
  const [isLoading, setIsLoading] = React.useState(false)

  React.useEffect(() => {
    if (params.action === 'edit' && params.id) {
      fetchBehavior()
    }
  }, [params.action, params.id])

  const fetchBehavior = async () => {
    try {
      const response = await fetch(`/api/behaviors/${params.id}`)
      if (!response.ok) throw new Error('Failed to fetch behavior')
      const data = await response.json()
      setFormData({
        title: data.title,
        description: data.description,
        category: data.category || '',
      })
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to load behavior',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const url = params.action === 'new' ? '/api/behaviors' : `/api/behaviors/${params.id}`
      const method = params.action === 'new' ? 'POST' : 'PUT'

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) throw new Error('Failed to save behavior')

      toast({
        title: 'Success',
        description: `Behavior ${params.action === 'new' ? 'created' : 'updated'} successfully`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      })

      router.push('/behaviors')
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to save behavior',
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
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <Container maxW="container.md" py={10}>
      <Stack spacing={6}>
        <Heading>
          {params.action === 'new' ? 'Add New Behavior' : 'Edit Behavior'}
        </Heading>

        <Box as="form" onSubmit={handleSubmit}>
          <Stack spacing={4}>
            <FormControl isRequired>
              <FormLabel>Title</FormLabel>
              <Input
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter behavior title"
              />
            </FormControl>

            <FormControl>
              <FormLabel>Category</FormLabel>
              <Input
                name="category"
                value={formData.category}
                onChange={handleChange}
                placeholder="Enter behavior category (optional)"
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Description</FormLabel>
              <Textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter behavior description"
                rows={4}
              />
            </FormControl>

            <Stack direction="row" spacing={4} justify="flex-end">
              <Button
                onClick={() => router.push('/behaviors')}
                isDisabled={isLoading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                colorScheme="blue"
                isLoading={isLoading}
              >
                {params.action === 'new' ? 'Create' : 'Update'}
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Container>
  )
} 