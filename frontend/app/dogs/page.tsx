'use client'

import React from 'react'
import {
  Box,
  Button,
  Container,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  IconButton,
  useToast,
  Stack,
  Text,
} from '@chakra-ui/react'
import { AddIcon, EditIcon, DeleteIcon } from '@chakra-ui/icons'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface Dog {
  id: string
  name: string
  breed: string
  age: number
  photo?: string | null
  notes?: string | null
}

export default function DogsPage() {
  const router = useRouter()
  const toast = useToast()
  const [dogs, setDogs] = React.useState<Dog[]>([])
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    fetchDogs()
  }, [])

  const fetchDogs = async () => {
    try {
      const response = await fetch('/api/dogs')
      if (!response.ok) throw new Error('Failed to fetch dogs')
      const data = await response.json()
      setDogs(data)
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to load dogs',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this dog?')) return

    try {
      const response = await fetch(`/api/dogs/${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) throw new Error('Failed to delete dog')

      toast({
        title: 'Success',
        description: 'Dog deleted successfully',
        status: 'success',
        duration: 3000,
        isClosable: true,
      })

      fetchDogs()
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete dog',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    }
  }

  return (
    <Container maxW="container.xl" py={10}>
      <Stack spacing={6}>
        <Stack direction="row" justify="space-between" align="center">
          <Stack>
            <Heading>My Dogs</Heading>
            <Text color="gray.600">Manage your dogs and their training progress</Text>
          </Stack>
          <Link href="/dogs/new" passHref>
            <Button leftIcon={<AddIcon />} colorScheme="blue">
              Add Dog
            </Button>
          </Link>
        </Stack>

        <Box overflowX="auto">
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th>Breed</Th>
                <Th>Age</Th>
                <Th>Notes</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {dogs.map((dog) => (
                <Tr key={dog.id}>
                  <Td>{dog.name}</Td>
                  <Td>{dog.breed}</Td>
                  <Td>{dog.age} years</Td>
                  <Td>{dog.notes || '-'}</Td>
                  <Td>
                    <Stack direction="row" spacing={2}>
                      <Link href={`/dogs/${dog.id}/edit`} passHref>
                        <IconButton
                          aria-label="Edit dog"
                          icon={<EditIcon />}
                          size="sm"
                          colorScheme="blue"
                        />
                      </Link>
                      <IconButton
                        aria-label="Delete dog"
                        icon={<DeleteIcon />}
                        size="sm"
                        colorScheme="red"
                        onClick={() => handleDelete(dog.id)}
                      />
                    </Stack>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      </Stack>
    </Container>
  )
} 