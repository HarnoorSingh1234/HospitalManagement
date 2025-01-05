
import { Box, Container, Typography, Link } from '@mui/material';

const Footer = () => {
  return (
    <Box component="footer" sx={{ bgcolor: 'background.paper', py: 6 }}>
      <Container maxWidth="lg">
        <Typography variant="body2" color="text.secondary" align="center">
          {'© '}
          {new Date().getFullYear()}
          {' '}
          <Link color="inherit" href="/">
            Hospital Management System
          </Link>
          {' | '}
          <Link color="inherit" href="/terms">
            Terms
          </Link>
          {' | '}
          <Link color="inherit" href="/privacy">
            Privacy Policy
          </Link>
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
