
import React from 'react';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Footer from './footer'

export default function Body({children}) {
  return (
    <Container component="main">
      <CssBaseline />
      {children}
      <Footer/>
      </Container>
  );
}