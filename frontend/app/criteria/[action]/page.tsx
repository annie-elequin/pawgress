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
  Select,
} from '@chakra-ui/react'
import { useRouter } from 'next/navigation'

interface CriterionFormData {
  name: string
  description: string
  difficultyLevel: string
  notes: string
}

interface PageParams {
  action: string
  id?: string
}

const DIFFICULTY_LEVELS = [
  { value: 'beginner', label: 'Beginner' },
  { value: 'intermediate', label: 'Intermediate' },
  { value: 'advanced', label: 'Advanced' },
]

export default function CriterionFormPage({ params }: { params: PageParams }) {
  const router = useRouter()
  const toast = useToast()
  const [formData, setFormData] = React.useState<CriterionFormData>({
    name: '',
    description: '',
    difficultyLevel: '',
    notes: '',
  })
  const [isLoading, setIsLoading] = React.useState(false)

  React.useEffect(() => {
    if (params.action === 'edit' && params.id) {
      fetchCriterion()
    }
  }, [params.action, params.id])

  const fetchCriterion = async () => {
    try {
      const response = await fetch(`/api/criteria/${params.id}`)
      if (!response.ok) throw new Error('Failed to fetch criterion')
      const data = await response.json()
      setFormData({
        name: data.name,
        description: data.description,
        difficultyLevel: data.difficultyLevel || '',
        notes: data.notes || '',
      })
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to load criterion',
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
      const url = params.action === 'new' ? '/api/criteria' : `/api/criteria/${params.id}`
      const method = params.action === 'new' ? 'POST' : 'PUT'

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) throw new Error('Failed to save criterion')

      toast({
        title: 'Success',
        description: `Criterion ${params.action === 'new' ? 'created' : 'updated'} successfully`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      })

      router.push('/criteria')
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to save criterion',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <Container maxW="container.md" py={10}>
      <Stack spacing={6}>
        <Heading>
          {params.action === 'new' ? 'Add New Criterion' : 'Edit Criterion'}
        </Heading>

        <Box as="form" onSubmit={handleSubmit}>
          <Stack spacing={4}>
            <FormControl isRequired>
              <FormLabel>Name</FormLabel>
              <Input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter criterion name"
              />
            </FormControl>

            <FormControl>
              <FormLabel>Difficulty Level</FormLabel>
              <Select
                name="difficultyLevel"
                value={formData.difficultyLevel}
                onChange={handleChange}
                placeholder="Select difficulty level"
              >
                {DIFFICULTY_LEVELS.map((level) => (
                  <option key={level.value} value={level.value}>
                    {level.label}
                  </option>
                ))}
              </Select>
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Description</FormLabel>
              <Textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter criterion description"
                rows={4}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Notes</FormLabel>
              <Textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                placeholder="Enter any additional notes (optional)"
                rows={4}
              />
            </FormControl>

            <Stack direction="row" spacing={4} justify="flex-end">
              <Button
                onClick={() => router.push('/criteria')}
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