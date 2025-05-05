import { contactInfo } from '../config/contact.js'; // Adjusted path
import { Container, Title, Divider, Text, Paper, Box, Button, Grid, Center } from '@mantine/core';
import { IconHelp, IconBrandWhatsapp } from '@tabler/icons-react';
import classes from './Counseling.module.css'; // For potential custom styles

export default function Counseling() {
  const openWhatsApp = () => {
    const message = encodeURIComponent('Hi, I would like to schedule a counseling session.');
    window.open(`https://wa.me/${contactInfo.whatsapp}?text=${message}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <Box component="section" id="counseling" py="xl" bg="gray.1">
      <Container size="md">
        <Box ta="center" mb="xl">
          <Title order={2} mb="sm" c="gray.8">Teen Counseling</Title>
          <Divider size="sm" w={80} mx="auto" mb="lg" color="yellow.5" />
        </Box>

        <Paper shadow="lg" radius="md" withBorder overflow="hidden">
          <Grid gutter={0}>
            <Grid.Col span={{ base: 12, sm: 5 }}>
              <Center bg="yellow.5" p="xl" h="100%">
                <IconHelp size={100} color='white' stroke={1.5}/>
              </Center>
            </Grid.Col>

            <Grid.Col span={{ base: 12, sm: 7 }}>
              <Box p="xl">
                <Title order={3} c="gray.8" mb="sm">Need Someone to Talk To?</Title>
                <Text c="gray.7" mb="md">
                  Navigating the teenage years can be challenging. Our trained counselors are here to provide
                  guidance, support, and a listening ear for any issues you may be facing – from school stress to
                  family dynamics, peer pressure, or questions about faith.
                </Text>
                <Text c="gray.7" mb="lg">
                  All conversations are confidential and held in a safe, non-judgmental environment.
                  We're here to help you thrive during this important time in your life.
                </Text>
                <Button
                  onClick={openWhatsApp}
                  leftSection={<IconBrandWhatsapp size={20} stroke={1.5} />}
                  variant="filled"
                  color="green"
                  size="md"
                  radius="xl"
                  className={classes.whatsappButton}
                >
                  Contact via WhatsApp
                </Button>
              </Box>
            </Grid.Col>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
} 