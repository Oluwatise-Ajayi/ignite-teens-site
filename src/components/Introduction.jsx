'use client';

import { Box, Container, Center, Stack, Title, Divider, Text, Button, useMantineTheme } from '@mantine/core';

export default function Introduction() {
  const theme = useMantineTheme();

  const scrollToForm = () => {
    const formElement = document.getElementById('form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Box
      component="section"
      id="about"
      py={{ base: 60, sm: 80 }} // Responsive padding (approx py-20)
      bg={theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0]} // Equivalent to bg-gray-50
    >
      <Container size="md" px="md"> {/* Equivalent to container mx-auto px-4 max-w-4xl */}
        <Stack align="center" gap="xl"> {/* Center content vertically */}
          <Title order={2} ta="center" fz={{ base: '2rem', sm: '2.5rem' }} fw={700} mb="sm">
            About <span style={{ color: theme.colors.yellow[6] }}>Ignite Teens</span>
          </Title>

          <Divider
            size="sm"
            color={theme.colors.yellow[6]}
            w={80} // w-20
            mb="xl"
          />

          <Text fz="lg" c="dimmed" ta="center" mb="md" lh={1.7}>
            Ignite Teens is a vibrant, dynamic community where teenagers can connect,
            grow in faith, and discover their purpose. We create a safe and engaging
            environment where teens can build meaningful relationships, develop leadership
            skills, and make a positive impact in their community.
          </Text>

          <Text fz="lg" c="dimmed" ta="center" mb="xl" lh={1.7}>
            Every week, we gather for worship, teaching, games, and small group discussions
            that are relevant to the challenges and opportunities teenagers face today.
            Our dedicated team of mentors is passionate about helping each teen reach their
            full potential and navigate this important season of life.
          </Text>

          <Center> {/* Center the button */}
            <Button
              onClick={scrollToForm}
              size="lg"
              radius="xl"
              color="yellow"
              variant="filled"
              styles={{
                 root: {
                   transition: 'transform 0.2s ease, background-color 0.2s ease',
                   '&:hover': {
                     transform: 'scale(1.05)',
                     backgroundColor: theme.colors.yellow[5] // Slightly darker yellow on hover
                   }
                 },
                 label: { color: 'black', fontWeight: 600 }
              }}
            >
              Join Us
            </Button>
          </Center>
        </Stack>
      </Container>
    </Box>
  );
} 