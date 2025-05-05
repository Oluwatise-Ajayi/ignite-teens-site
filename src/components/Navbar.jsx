'use client';

import { useState, useEffect } from 'react';
import { Box, Container, Group, Burger, Drawer, Anchor, Title, useMantineTheme, Stack } from '@mantine/core';
import { useDisclosure, useWindowScroll } from '@mantine/hooks';

const navItems = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Gallery', href: '#gallery' },
  { name: 'Events', href: '#events' },
  { name: 'Join Us', href: '#form' },
  { name: 'Counseling', href: '#counseling' },
  { name: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [opened, { toggle, close }] = useDisclosure(false);
  const [activeSection, setActiveSection] = useState('home');
  const theme = useMantineTheme();
  const [scroll] = useWindowScroll(); // Can be used for scroll effects if needed

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => item.href.substring(1));
      let current = 'home'; // Default to home

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Check if the top of the section is near the top of the viewport (adjust 100 as needed)
          // Or if the section significantly overlaps the middle of the viewport
          if (rect.top <= 100 && rect.bottom >= 100) {
            current = sectionId;
            break; // Found the most relevant section
          }
        }
      }
       // Fallback if no section is actively scrolled to the top area
       if (current === 'home' && window.scrollY > 100) {
           // Check the first actual section if scrolled past the very top
           const firstSectionElement = document.getElementById(sections[0]);
           if (firstSectionElement && firstSectionElement.getBoundingClientRect().top > 100) {
               // If the first section hasn't reached the threshold, keep it home or decide based on scroll position
               current = 'home'; // Or potentially determine based purely on scrollY if needed
           } else if (firstSectionElement && firstSectionElement.getBoundingClientRect().bottom < 100) {
              // If we scrolled past the first section, find the next one
               for (const sectionId of sections) {
                    const element = document.getElementById(sectionId);
                    if (element && element.getBoundingClientRect().top > 100) {
                       // Find the previous section id
                       const currentIndex = sections.indexOf(sectionId);
                       if(currentIndex > 0) current = sections[currentIndex-1];
                       else current = 'home'; // Stick to home if calculation is off
                       break;
                    }
               }
               // If loop finishes, we are likely at the last section
               if (current === 'home' && window.scrollY > 100) { // Re-check needed after loop
                  const lastElement = document.getElementById(sections[sections.length - 1]);
                  if (lastElement && lastElement.getBoundingClientRect().top <= 100) {
                     current = sections[sections.length - 1];
                  }
               }
           }
       }

      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []); // No dependencies needed if navItems is static

  const createLink = (item, isMobile = false) => {
    const isActive = activeSection === item.href.substring(1);
    return (
      <Anchor
        key={item.name}
        href={item.href}
        onClick={isMobile ? close : undefined} // Close drawer on mobile click
        fz={isMobile ? 'lg' : 'sm'} // Larger font size in drawer
        fw={500}
        c={isActive ? theme.colors.yellow[4] : 'white'}
        td="none"
        style={{ position: 'relative', padding: '8px 4px' }} // Style for underline effect
        sx={(theme) => ({
          padding: isMobile ? '10px 15px' : '8px 4px',
          borderRadius: isMobile ? theme.radius.sm : 0,
          borderLeft: isMobile && isActive ? `4px solid ${theme.colors.yellow[4]}` : 'none',
          paddingLeft: isMobile && isActive ? '11px' : (isMobile ? '15px' : '4px'), // Adjust padding for border
          backgroundColor: isMobile && isActive ? theme.fn.rgba(theme.colors.dark[4], 0.3) : 'transparent',
          transition: 'color 0.3s ease, background-color 0.3s ease, border-left 0.3s ease',
          '&::after': { // Underline effect for desktop
            content: '""',
            position: 'absolute',
            bottom: 4, // Adjust position of underline
            left: '4px', // Match padding
            right: '4px', // Match padding
            height: '2px',
            backgroundColor: theme.colors.yellow[4],
            transform: isActive ? 'scaleX(1)' : 'scaleX(0)',
            transition: 'transform 0.3s ease',
            transformOrigin: 'bottom left',
          },
          '&:hover::after': !isMobile ? { // Hover effect for desktop underline
             transform: 'scaleX(1)',
          } : {},
          '&:hover': {
            color: theme.colors.yellow[4],
            backgroundColor: isMobile ? theme.fn.rgba(theme.colors.dark[3], 0.4) : 'transparent',
          },
        })}
      >
        {item.name}
      </Anchor>
    );
  };


  return (
    <>
      <Box
        component="nav"
        pos="fixed"
        top={0}
        left={0}
        w="100%"
        py="sm" // Mantine padding scale
        bg="black"
        c="white" // Default text color
        style={{ zIndex: 100, borderBottom: `4px solid ${theme.colors.yellow[4]}` }}
        sx={{ transition: 'all 0.3s ease' }} // Smooth transitions
      >
        <Container size="lg"> {/* Adjust container size as needed */}
          <Group justify="space-between" align="center">
            <Title order={3}> {/* Use Title for semantic heading */}
              <Anchor href="#home" c={theme.colors.yellow[4]} td="none" fz="xl" fw={700}>
                Ignite Teens
              </Anchor>
            </Title>

            {/* Desktop Menu */}
            <Group gap="lg" visibleFrom="sm"> {/* Use visibleFrom for responsive hiding */}
              {navItems.map(item => createLink(item, false))}
            </Group>

            {/* Mobile Burger */}
            <Burger
              opened={opened}
              onClick={toggle}
              hiddenFrom="sm" // Use hiddenFrom for responsive hiding
              size="sm"
              color="white"
              aria-label="Toggle navigation"
            />
          </Group>
        </Container>
      </Box>

      {/* Mobile Drawer */}
      <Drawer
        opened={opened}
        onClose={close}
        title={<Title order={4} c={theme.colors.yellow[4]}>Navigation</Title>}
        padding="md"
        size="sm" // Adjust drawer size
        position="right"
        hiddenFrom="sm" // Only show on small screens
        overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
        withCloseButton
        closeButtonProps={{ 'aria-label': 'Close side menu'}}
        styles={{
            header: { backgroundColor: theme.colors.dark[7] },
            body: { backgroundColor: theme.colors.dark[7], padding: 'md', paddingTop: 0 }, // Dark background for drawer
            title: { color: theme.colors.yellow[4] }
        }}
      >
        <Stack mt="md" gap="xs"> {/* Use Stack instead of Box and adjust gap */} 
            {navItems.map(item => createLink(item, true))}
        </Stack>
      </Drawer>
    </>
  );
} 