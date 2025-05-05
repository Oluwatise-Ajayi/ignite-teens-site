import { useState } from 'react';
import { branches } from '../config/contact.js'; // Adjusted path
import { Container, Title, Divider, Text, Grid, Paper, Box, TextInput, Select, Button, Notification, Group } from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconCheck } from '@tabler/icons-react';

export default function ContactForm() {
  const [showSuccess, setShowSuccess] = useState(false);

  const form = useForm({
    initialValues: {
      firstName: '',
      surname: '',
      email: '',
      phone: '',
      age: '', // Keep as string for input, validate as number
      branch: ''
    },

    validate: {
      firstName: (value) => value.trim().length === 0 ? 'First name is required' : null,
      surname: (value) => value.trim().length === 0 ? 'Surname is required' : null,
      email: (value) => (
        value.trim().length === 0 ? 'Email is required' :
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? null : 'Invalid email'
      ),
      phone: (value) => value.trim().length === 0 ? 'Phone number is required' : null,
      age: (value) => {
        if (value.trim().length === 0) return 'Age is required';
        const ageNum = Number(value);
        if (isNaN(ageNum)) return 'Age must be a number';
        if (ageNum < 12 || ageNum > 19) return 'Age must be between 12 and 19';
        return null;
      },
      branch: (value) => value === '' ? 'Please select a branch' : null,
    },
  });

  const handleSubmit = (values) => {
    // Here you would typically send the data to your backend
    console.log('Form data submitted:', values);

    // Show success message
    setShowSuccess(true);
    form.reset();

    // Hide success message after 5 seconds
    setTimeout(() => {
      setShowSuccess(false);
    }, 5000);
  };

  return (
    <Box component="section" id="form" py="xl" bg="white">
      <Container size="lg">
        <Box ta="center" mb="xl">
          <Title order={2} mb="sm" c="gray.8">Join Our Community</Title>
          <Divider size="sm" w={80} mx="auto" mb="lg" color="yellow.5" />
          <Text c="gray.6" size="lg" maw={700} mx="auto">
            We'd love to welcome you to our Ignite Teens community! Fill out the form below to get connected.
          </Text>
        </Box>

        <Paper maw={600} mx="auto" bg="gray.0" p="xl" radius="md" shadow="lg">
          {showSuccess && (
            <Notification
              icon={<IconCheck size={18} />}
              color="teal"
              title="Thank you!"
              withCloseButton={false}
              onClose={() => setShowSuccess(false)}
              mb="lg"
            >
              We've received your information and will be in touch soon.
            </Notification>
          )}

          <form onSubmit={form.onSubmit(handleSubmit)}>
            <Grid gutter="md">
              <Grid.Col span={{ base: 12, sm: 6 }}>
                <TextInput
                  withAsterisk
                  label="First Name"
                  placeholder="Your first name"
                  {...form.getInputProps('firstName')}
                />
              </Grid.Col>
              <Grid.Col span={{ base: 12, sm: 6 }}>
                <TextInput
                  withAsterisk
                  label="Surname"
                  placeholder="Your surname"
                  {...form.getInputProps('surname')}
                />
              </Grid.Col>
              <Grid.Col span={12}>
                <TextInput
                  withAsterisk
                  label="Email"
                  placeholder="your@email.com"
                  {...form.getInputProps('email')}
                />
              </Grid.Col>
              <Grid.Col span={{ base: 12, sm: 6 }}>
                <TextInput
                  withAsterisk
                  label="Phone Number"
                  placeholder="Your phone number"
                  type="tel"
                  {...form.getInputProps('phone')}
                />
              </Grid.Col>
              <Grid.Col span={{ base: 12, sm: 6 }}>
                 <TextInput
                  withAsterisk
                  label="Age"
                  placeholder="12-19"
                  type="number"
                  min="12"
                  max="19"
                  {...form.getInputProps('age')}
                />
              </Grid.Col>
              <Grid.Col span={12}>
                <Select
                  withAsterisk
                  label="Branch"
                  placeholder="Select a branch"
                  data={branches.map(branch => ({ label: branch, value: branch }))}
                  {...form.getInputProps('branch')}
                />
              </Grid.Col>
            </Grid>

            <Group justify="center" mt="xl">
              <Button type="submit" size="md" radius="xl" color="yellow.6">
                Submit
              </Button>
            </Group>
          </form>
        </Paper>
      </Container>
    </Box>
  );
} 