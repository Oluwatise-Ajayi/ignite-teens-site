'use client';

import { useState, useEffect } from 'react';
import { Box, Image, Overlay, Center, Stack, Title, Button, useMantineTheme, Transition } from '@mantine/core';
import { IconArrowDown } from '@tabler/icons-react'; // Using Tabler icon for scroll indicator
import { headerImages } from '../config/images'; // Assuming this path is correct

export default function Header() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showImage, setShowImage] = useState(true);
  const theme = useMantineTheme();

  useEffect(() => {
    const interval = setInterval(() => {
      setShowImage(false); // Start fade out
    }, 9000); // Start fade out 1 second before changing image (10s total cycle)

    return () => clearInterval(interval);
  }, []);

  const handleTransitionEnd = () => {
    if (!showImage) {
      setCurrentImageIndex((prev) => (prev + 1) % headerImages.length);
      setShowImage(true); // Start fade in with the new image
    }
  };

  const scrollToForm = () => {
    const formElement = document.getElementById('form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Box
      component="section"
      id="home"
      pos="relative"
      h={{ base: '100vh', sm: '100vh' }} // Full screen height
      style={{ overflow: 'hidden' }} // Prevent content overflow
    >
      {/* Slideshow Background */}
      <Box pos="absolute" inset={0} w="100%" h="100%">
        <Transition
          mounted={showImage}
          transition="fade"
          duration={1000} // Fade duration
          onExited={handleTransitionEnd} // Change image when fade out completes
        >
          {(styles) => (
            <Image
              src={headerImages[currentImageIndex]} // Use state index
              alt="Ignite Teens Church Background"
              w="100%"
              h="100%"
              fit="fill"
              style={{ ...styles, position: 'absolute', inset: 0 }}
              // Note: priority/unoptimized are Next/Image specific
              // Loading behavior might differ slightly
            />
          )}
        </Transition>
        <Overlay color="#000" backgroundOpacity={0.45} zIndex={1} /> {/* Dark overlay */}
      </Box>

      {/* Content */}
      <Center pos="relative" h="100%" style={{ zIndex: 2 }}>
        <Stack align="center" gap="lg" p="md">
          {/* Conditional content based on image index can be complex, showing always for simplicity */}
          {/* Or use another transition for the text content if needed */}
          <Box style={{ color: 'white' }}> {/* Ensure text color is white */}
            <Title order={2} ta="center" fz={{ base: '2rem', sm: '2.5rem' }} fw={700}>
              Welcome To
            </Title>
            <Title order={1} ta="center" fz={{ base: '3.5rem', sm: '5rem' }} fw={800} mt="xs">
              Ignite <span style={{ color: theme.colors.yellow[4] }}>Teens</span>
            </Title>
            <Center mt="xl">
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
                    }
                  },
                  label: { color: 'black', fontWeight: 600 }
                }}
              >
                Join Us
              </Button>
            </Center>
          </Box>
        </Stack>
      </Center>

      {/* Scroll indicator - Simple icon, animation needs custom CSS */}
      <Box
        pos="absolute"
        bottom={40} // Approx bottom-10
        left="50%"
        style={{ transform: 'translateX(-50%)', zIndex: 3 }}
        // Add custom CSS for bounce animation if needed
      >
        <IconArrowDown size={40} color={theme.white} />
      </Box>
    </Box>
  );
} 