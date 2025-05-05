import { socialLinks, contactInfo } from '../config/contact.js'; // Adjusted path
import { Container, Title, Divider, Text, Grid, Paper, Group, Stack, ActionIcon, Box, Anchor, Center } from '@mantine/core';
import { IconBrandInstagram, IconBrandYoutube, IconBrandTiktok, IconPhone, IconMail, IconMapPin, IconBrandWhatsapp } from '@tabler/icons-react';
import classes from './Contact.module.css'; // Assuming CSS Modules for custom hover etc.

// Helper to map icon names to components
const iconMap = {
  Instagram: IconBrandInstagram,
  Youtube: IconBrandYoutube,
  TikTok: IconBrandTiktok,
};

export default function Contact() {
  const openLink = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer'); // Added security attributes
  };

  return (
    <Box component="section" id="contact" py="xl" bg="dark.8" c="white">
      <Container size="lg">
        <Box ta="center" mb="xl">
          <Title order={2} mb="sm">Connect With Us</Title>
          <Divider size="sm" w={80} mx="auto" mb="lg" color="yellow.5" />
          <Text c="gray.5" size="lg" maw={700} mx="auto">
            Stay connected with Ignite Teens through our social media channels and reach out to us anytime.
          </Text>
        </Box>

        <Container size="md" p={0}>
          <Grid gutter="xl">
            {/* Social Media & Contact Info */}
            <Grid.Col span={{ base: 12, md: 6 }}>
              <Paper bg="dark.7" p="xl" radius="md" withBorder>
                <Title order={3} mb="lg">Follow Us</Title>
                <Group grow gap="md" mb="xl">
                  {socialLinks.map((link, index) => {
                    const Icon = iconMap[link.icon];
                    return Icon ? (
                      <Paper
                        key={index}
                        onClick={() => openLink(link.url)}
                        p="md"
                        radius="md"
                        withBorder
                        bg="dark.6"
                        className={classes.socialCard} // Use CSS module class
                        style={{ cursor: 'pointer', textAlign: 'center' }}
                      >
                        <Center>
                           <Icon size={32} />
                        </Center>
                        <Text mt="xs" size="sm">{link.name}</Text>
                      </Paper>
                    ) : null;
                  })}
                </Group>

                <Title order={3} mb="lg">Contact Info</Title>
                <Stack gap="md">
                  <Group wrap="nowrap">
                    <ActionIcon variant="filled" color="yellow.5" size="lg" radius="xl">
                      <IconPhone stroke={1.5} />
                    </ActionIcon>
                    <Anchor href={`tel:${contactInfo.phone}`} c="white" lh={1.2}>{contactInfo.phone}</Anchor>
                  </Group>
                  <Group wrap="nowrap">
                    <ActionIcon variant="filled" color="yellow.5" size="lg" radius="xl">
                      <IconMail stroke={1.5} />
                    </ActionIcon>
                    <Anchor href={`mailto:${contactInfo.email}`} c="white" lh={1.2}>{contactInfo.email}</Anchor>
                  </Group>
                  <Group wrap="nowrap" align="flex-start">
                    <ActionIcon variant="filled" color="yellow.5" size="lg" radius="xl" mt={4}>
                      <IconMapPin stroke={1.5} />
                    </ActionIcon>
                    {/* Assuming address might have line breaks, use pre-wrap */}
                    <Text style={{ whiteSpace: 'pre-wrap' }} lh={1.2}>{contactInfo.address}</Text>
                  </Group>
                </Stack>
              </Paper>
            </Grid.Col>

            {/* Map */}
            <Grid.Col span={{ base: 12, md: 6 }}>
             <Box style={{ minHeight: '400px', height: '100%' }}>
               <iframe
                  src={contactInfo.mapEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0, borderRadius: 'var(--mantine-radius-md)', minHeight: '400px' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Google Maps Location"
                ></iframe>
             </Box>
            </Grid.Col>
          </Grid>

           {/* WhatsApp Floating Button */}
          <ActionIcon
            onClick={() => openLink(`https://wa.me/${contactInfo.whatsapp}`)}
            variant="filled"
            color="green"
            size={60} // Larger size
            radius="xl"
            style={{ position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 1000 }}
            className={classes.whatsappButton} // Use CSS module class
          >
            <IconBrandWhatsapp size={36} stroke={1.5} />
          </ActionIcon>

          <Box ta="center" mt={60}> {/* Increased margin top */}
            <Text c="gray.6">© {new Date().getFullYear()} Ignite Teens Church. All rights reserved.</Text>
          </Box>
        </Container>
      </Container>
    </Box>
  );
} 