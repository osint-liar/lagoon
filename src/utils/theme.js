// theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
        palette: {
            type: 'light',
            primary: {
                main: '#2C81AB',
            },
            secondary: {
                main: '#619657',
            },
            cancel: {
                main: '#6F7678',
            }
        },
        paper: {
            marginTop: 12,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        },
        avatar: {
            margin: 12,
            backgroundColor: '#2C81AB',
        },
        form: {
            width: '100%',
            marginTop: 12,
        },
        submit: {
            margin: 12,
        },
        selectAdornment: {
            marginRight: 12,
        }
    })

export default theme;
