import { useState, useEffect } from 'react';
import { galleryImages } from '../config/images'; // Adjusted path
import { Container, Title, Divider, Text, Grid, Paper, Image, Box, useMantineTheme } from '@mantine/core';
import { useInterval } from '@mantine/hooks'; // Using Mantine hook for interval

const NUM_PLACEHOLDERS = 6; // Define the number of placeholders
const TOTAL_CYCLE_TIME_MS = 3000; // Time for all placeholders to update once
const UPDATE_DELAY_MS = TOTAL_CYCLE_TIME_MS / NUM_PLACEHOLDERS; // Delay between each placeholder update

export default function Gallery() {
  // State to hold the current image index for each placeholder
  const [activeIndices, setActiveIndices] = useState(Array(NUM_PLACEHOLDERS).fill(0));
  const [nextPlaceholderToUpdate, setNextPlaceholderToUpdate] = useState(0); // Track which placeholder updates next
  const theme = useMantineTheme(); // Get theme instance

  // Interval runs frequently, updating one placeholder at a time
  const interval = useInterval(() => {
    // Determine which placeholder to update in this tick
    const placeholderIndexToUpdate = nextPlaceholderToUpdate;

    // Update the activeIndices state for the specific placeholder
    setActiveIndices((currentIndices) => {
      const newIndices = [...currentIndices];
      // const currentImageIndex = newIndices[placeholderIndexToUpdate]; // Don't need current index for random
      // Cycle to the next image for this specific placeholder
      // newIndices[placeholderIndexToUpdate] = (currentImageIndex + 1) % galleryImages.length; // Previous sequential logic
      // Assign a new random image index to this specific placeholder
      newIndices[placeholderIndexToUpdate] = Math.floor(Math.random() * galleryImages.length);
      return newIndices;
    });

    // Schedule the next placeholder for the next tick
    setNextPlaceholderToUpdate((prev) => (prev + 1) % NUM_PLACEHOLDERS);

  }, UPDATE_DELAY_MS); // Use the calculated delay between updates

  useEffect(() => {
    // Start interval only if there are images and placeholders
    if (galleryImages.length > 0 && NUM_PLACEHOLDERS > 0) {
      interval.start();
      return interval.stop;
    }
  }, [interval, galleryImages.length]); // Re-run if images load or interval changes

  // Create an array to map over for rendering placeholders
  const placeholders = Array.from({ length: NUM_PLACEHOLDERS });

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

        {galleryImages.length === 0 ? (
          <Text ta="center" c="gray.6">Gallery images are loading or unavailable.</Text>
        ) : (
          <Grid gutter="md">
            {/* Map over placeholders to create 6 grid columns */}
            {placeholders.map((_, placeholderIndex) => (
              <Grid.Col span={{ base: 12, sm: 6, md: 4 }} key={placeholderIndex}>
                <Paper
                  shadow="md"
                  radius="md"
                  withBorder // Add a consistent border
                  style={{
                    height: '16rem', // Maintain consistent height
                    overflow: 'hidden',
                    position: 'relative',
                    // Removed dynamic border/highlighting styles
                    // border: index === activeImageIndex
                    //   ? `3px solid ${theme.colors.yellow[5]}` // Highlight active
                    //   : `1px solid ${theme.colors.gray[3]}`, // Default border for others
                    // transition: 'border-color 0.3s ease-in-out', // Animate border change
                  }}
                >
                  <Image
                    // Get the image source based on the placeholder's current active index
                    src={galleryImages[activeIndices[placeholderIndex]]}
                    alt={`Gallery image placeholder ${placeholderIndex + 1}`}
                    h="100%"
                    w="100%"
                    fit="cover"
                    style={{
                      // Keep transition for smoothness
                      transition: 'opacity 0.5s ease-in-out',
                      // Removed transform style
                    }}
                  />
                  {/* Removed old overlay/highlighting logic */}
                </Paper>
              </Grid.Col>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
} 