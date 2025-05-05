import { useState, useEffect } from 'react';
import { galleryImages } from '../config/images'; // Adjusted path
import { Container, Title, Divider, Text, Grid, Paper, Image, Box } from '@mantine/core';
import { useInterval } from '@mantine/hooks'; // Using Mantine hook for interval

export default function Gallery() {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Using Mantine's useInterval hook for cleaner interval management
  const interval = useInterval(() => {
    setIsAnimating(true);
    // Short delay for the animation effect before changing the image
    setTimeout(() => {
      setActiveImageIndex((prev) => (prev + 1) % galleryImages.length);
      setIsAnimating(false);
    }, 500); // Animation duration
  }, 3000); // Change image every 3 seconds

  useEffect(() => {
    interval.start();
    return interval.stop;
  }, [interval]);

  return (
    <Box component="section" id="gallery" py="xl" bg="white">
      <Container size="lg">
        <Box ta="center" mb="xl">
          <Title order={2} mb="sm" c="gray.8">Our Gallery</Title>
          <Divider size="sm" w={80} mx="auto" mb="lg" color="yellow.5" />
          <Text c="gray.6" size="lg" maw={700} mx="auto">
            Glimpses of our vibrant community, events, and the amazing moments we share together.
          </Text>
        </Box>

        <Grid gutter="md">
          {galleryImages.map((imageSrc, index) => (
            <Grid.Col span={{ base: 12, sm: 6, md: 4 }} key={index}>
              <Paper
                shadow="md"
                radius="md"
                withBorder
                style={{ height: '16rem', overflow: 'hidden', position: 'relative' }}
              >
                <Image
                  src={imageSrc} // Use imageSrc directly
                  alt={`Gallery image ${index + 1}`}
                  h="100%"
                  w="100%"
                  fit="cover"
                  style={{
                    transition: 'transform 0.5s ease-in-out, opacity 0.5s ease-in-out',
                    transform: index === activeImageIndex && isAnimating ? 'scale(1.1)' : 'scale(1)',
                    opacity: index === activeImageIndex && isAnimating ? 0.8 : 1,
                  }}
                />
                {/* Simple overlay effect (optional) */}
                {/* <Box
                  style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0)', // Initially transparent
                    transition: 'background-color 0.3s',
                  }}
                  sx={{ '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.4)' } }}
                /> */}
              </Paper>
            </Grid.Col>
          ))}
        </Grid>
      </Container>
    </Box>
  );
} 