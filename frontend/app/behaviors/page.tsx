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
  Badge,
} from '@chakra-ui/react'
import { AddIcon, EditIcon, DeleteIcon } from '@chakra-ui/icons'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface Behavior {
  id: string
  title: string
  description: string
  category?: string | null
  createdAt: string
}

export default function BehaviorsPage() {
  const router = useRouter()
  const toast = useToast()
  const [behaviors, setBehaviors] = React.useState<Behavior[]>([])
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    fetchBehaviors()
  }, [])

  const fetchBehaviors = async () => {
    try {
      const response = await fetch('/api/behaviors')
      if (!response.ok) throw new Error('Failed to fetch behaviors')
      const data = await response.json()
      setBehaviors(data)
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to load behaviors',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this behavior?')) return

    try {
      const response = await fetch(`/api/behaviors/${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) throw new Error('Failed to delete behavior')

      toast({
        title: 'Success',
        description: 'Behavior deleted successfully',
        status: 'success',
        duration: 3000,
        isClosable: true,
      })

      fetchBehaviors()
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete behavior',
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
            <Heading>Training Behaviors</Heading>
            <Text color="gray.600">Manage your training behaviors and criteria</Text>
          </Stack>
          <Link href="/behaviors/new" passHref>
            <Button leftIcon={<AddIcon />} colorScheme="blue">
              Add Behavior
            </Button>
          </Link>
        </Stack>

        <Box overflowX="auto">
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Title</Th>
                <Th>Category</Th>
                <Th>Description</Th>
                <Th>Created</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {behaviors.map((behavior) => (
                <Tr key={behavior.id}>
                  <Td>{behavior.title}</Td>
                  <Td>
                    {behavior.category ? (
                      <Badge colorScheme="green">{behavior.category}</Badge>
                    ) : (
                      '-'
                    )}
                  </Td>
                  <Td>{behavior.description}</Td>
                  <Td>{new Date(behavior.createdAt).toLocaleDateString()}</Td>
                  <Td>
                    <Stack direction="row" spacing={2}>
                      <Link href={`/behaviors/${behavior.id}/edit`} passHref>
                        <IconButton
                          aria-label="Edit behavior"
                          icon={<EditIcon />}
                          size="sm"
                          colorScheme="blue"
                        />
                      </Link>
                      <IconButton
                        aria-label="Delete behavior"
                        icon={<DeleteIcon />}
                        size="sm"
                        colorScheme="red"
                        onClick={() => handleDelete(behavior.id)}
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