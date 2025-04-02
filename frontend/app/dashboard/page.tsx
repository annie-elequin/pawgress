'use client'

import React from 'react'
import {
  Box,
  Container,
  Grid,
  Heading,
  Text,
  Stack,
  Button,
  useColorModeValue,
} from '@chakra-ui/react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'

export default function DashboardPage() {
  const { data: session } = useSession()
  const bgColor = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.700')

  const features = [
    {
      title: 'Dogs',
      description: 'Manage your dogs and their training progress',
      href: '/dogs',
      colorScheme: 'blue',
    },
    {
      title: 'Behaviors',
      description: 'Create and track training behaviors',
      href: '/behaviors',
      colorScheme: 'green',
    },
    {
      title: 'Criteria',
      description: 'Define training criteria and difficulty levels',
      href: '/criteria',
      colorScheme: 'purple',
    },
  ]

  return (
    <Container maxW="container.xl" py={10}>
      <Stack spacing={8}>
        <Stack spacing={2}>
          <Heading>Welcome back, {session?.user?.name || 'there'}!</Heading>
          <Text fontSize="lg" color="gray.600">
            Track and manage your dog's training progress
          </Text>
        </Stack>

        <Grid templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }} gap={6}>
          {features.map((feature) => (
            <Box
              key={feature.title}
              p={6}
              bg={bgColor}
              borderWidth="1px"
              borderColor={borderColor}
              borderRadius="lg"
              _hover={{ shadow: 'md' }}
            >
              <Stack spacing={4}>
                <Heading size="md">{feature.title}</Heading>
                <Text color="gray.600">{feature.description}</Text>
                <Link href={feature.href} passHref>
                  <Button colorScheme={feature.colorScheme}>
                    Go to {feature.title}
                  </Button>
                </Link>
              </Stack>
            </Box>
          ))}
        </Grid>
      </Stack>
    </Container>
  )
} 