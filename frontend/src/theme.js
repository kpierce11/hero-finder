import { createTheme } from '@mui/material/styles';

export const lightTheme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: `#ED1D24`,
        },
        background: {
            default: `#FFFFFF`,
            paper: `#F5F5F5`,
        },
        text: {
            primary: `#151515`,
        },
    },
});

export const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: `#ED1D24`,
        },
        background: {
            default: `#151515`,
            paper: `#222222`,
        },
        text: {
            primary: `#FFFFFF`,
        },
    },
});