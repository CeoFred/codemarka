import React from 'react'
import Chat from './Chat.jsx'

import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
 function Environment() {
    
        return (
            <React.Fragment>
                  <CssBaseline />
                   <Container fixed>
        <Chat />
            
      </Container>
            </React.Fragment>
        )
    
}

export default Environment;