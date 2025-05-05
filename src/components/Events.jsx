'use client';

import { Box, Container, Stack, Title, Divider, Text, SimpleGrid, Card, Image, Overlay, Button, Group, useMantineTheme, rem } from '@mantine/core';
import { eventImages } from '@/config/images'; 

export default function Events() {
  const theme = useMantineTheme();

  // Styles for the card overlay and content reveal on hover
  const cardStyles = {
    root: {
      position: 'relative',
      overflow: 'hidden', // Ensure hover content doesn't overflow weirdly initially
      transition: 'box-shadow 0.3s ease, transform 0.3s ease',
      '&:hover .cardOverlay': {
        opacity: 1,
      },
      '&:hover .cardContent': {
        opacity: 1,
        transform: 'translateY(0)',
      },
      '&:hover .cardImage': {
        transform: 'scale(1.1)',
      },
      '&:hover': {
        transform: 'translateY(-2px)', // Slight lift on hover
        boxShadow: theme.shadows.lg,
      }
    }
  };

  const overlayStyles = {
    root: {
        position: 'absolute',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.3)', // Initial darker overlay
        transition: 'background-color 0.3s ease',
        opacity: 0, // Start hidden, controlled by hover on parent
        zIndex: 1,
    }
  };

  const contentStyles = {
     root: {
        position: 'absolute',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        padding: theme.spacing.lg,
        zIndex: 2,
        opacity: 0,
        transform: 'translateY(10px)', // Start slightly down
        transition: 'opacity 0.3s ease, transform 0.3s ease',
     }
  };

  return (
    <Box
      component="section"
      id="events"
      py={{ base: 60, sm: 80 }} // Responsive padding
      bg={theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0]} // bg-gray-50
    >
      <Container size="lg" px="md"> {/* container mx-auto px-4 */}
        <Stack align="center" mb={rem(60)}> {/* text-center mb-12 */}
          <Title order={2} ta="center" fz={{ base: '2rem', sm: '2.5rem' }} fw={700} mb="sm">
            Upcoming Events
          </Title>
          <Divider
            size="sm"
            color={theme.colors.yellow[6]}
            w={80}
            mb="xl"
          />
          <Text fz="lg" c="dimmed" ta="center" maw={rem(700)}> {/* max-w-3xl mx-auto */}
            Join us for these exciting upcoming events. There's always something happening at Ignite Teens!
          </Text>
        </Stack>

        <SimpleGrid
          cols={{ base: 1, sm: 2, lg: 3 }} // grid-cols-1 md:grid-cols-2 lg:grid-cols-3
          spacing="xl" // gap-8
        >
          {eventImages.map((event, index) => (
            <Card key={index} shadow="md" radius="md" p={0} styles={cardStyles}> {/* Replaces outer div */}
              <Card.Section style={{ position: 'relative', height: rem(256), overflow: 'hidden' }}> {/* h-64 */}
                <Image
                  src={event.src}
                  alt={event.title}
                  h="100%"
                  w="100%"
                  fit="cover"
                  className="cardImage" // Class for targeting hover effect
                  style={{ transition: 'transform 0.5s ease' }}
                />
                {/* Overlay revealed on hover */}
                <Overlay className="cardOverlay" styles={overlayStyles} backgroundOpacity={0.5} />

                {/* Hover Content */}
                <Box className="cardContent" styles={contentStyles}>
                    <Box bg="rgba(0, 0, 0, 0.75)" p="md" radius="sm" >
                         <Title order={3} c="white" fz="xl" fw={700} mb="xs">{event.title}</Title>
                         <Text c="gray.3" fz="sm" mb="md" lineClamp={3}>{event.description}</Text>
                         <Button
                           size="sm"
                           radius="xl"
                           color="yellow"
                           variant="filled"
                           styles={{ label: { color: 'black', fontWeight: 600 }}}
                           // Add onClick or href if needed
                         >
                           Read More
                         </Button>
                    </Box>
                </Box>
              </Card.Section>

              {/* Title shown before hover (optional, as hover reveals it too) */}
              {/* Commented out to match Tailwind behavior where title is part of hover reveal */}
              {/*
              <Group justify="space-between" p="md">
                <Title order={4} fw={600}>{event.title}</Title>
              </Group>
              */}
            </Card>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
} 