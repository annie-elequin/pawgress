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

interface Criterion {
  id: string
  name: string
  description: string
  difficultyLevel?: string | null
  notes?: string | null
  createdAt: string
}

export default function CriteriaPage() {
  const router = useRouter()
  const toast = useToast()
  const [criteria, setCriteria] = React.useState<Criterion[]>([])
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    fetchCriteria()
  }, [])

  const fetchCriteria = async () => {
    try {
      const response = await fetch('/api/criteria')
      if (!response.ok) throw new Error('Failed to fetch criteria')
      const data = await response.json()
      setCriteria(data)
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to load criteria',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this criterion?')) return

    try {
      const response = await fetch(`/api/criteria/${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) throw new Error('Failed to delete criterion')

      toast({
        title: 'Success',
        description: 'Criterion deleted successfully',
        status: 'success',
        duration: 3000,
        isClosable: true,
      })

      fetchCriteria()
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete criterion',
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
            <Heading>Training Criteria</Heading>
            <Text color="gray.600">Manage your training criteria and difficulty levels</Text>
          </Stack>
          <Link href="/criteria/new" passHref>
            <Button leftIcon={<AddIcon />} colorScheme="blue">
              Add Criterion
            </Button>
          </Link>
        </Stack>

        <Box overflowX="auto">
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th>Difficulty Level</Th>
                <Th>Description</Th>
                <Th>Notes</Th>
                <Th>Created</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {criteria.map((criterion) => (
                <Tr key={criterion.id}>
                  <Td>{criterion.name}</Td>
                  <Td>
                    {criterion.difficultyLevel ? (
                      <Badge colorScheme="green">{criterion.difficultyLevel}</Badge>
                    ) : (
                      '-'
                    )}
                  </Td>
                  <Td>{criterion.description}</Td>
                  <Td>{criterion.notes || '-'}</Td>
                  <Td>{new Date(criterion.createdAt).toLocaleDateString()}</Td>
                  <Td>
                    <Stack direction="row" spacing={2}>
                      <Link href={`/criteria/${criterion.id}/edit`} passHref>
                        <IconButton
                          aria-label="Edit criterion"
                          icon={<EditIcon />}
                          size="sm"
                          colorScheme="blue"
                        />
                      </Link>
                      <IconButton
                        aria-label="Delete criterion"
                        icon={<DeleteIcon />}
                        size="sm"
                        colorScheme="red"
                        onClick={() => handleDelete(criterion.id)}
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