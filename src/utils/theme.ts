import { createTheme } from '@mui/material';

declare module '@mui/material/styles' {
    interface Theme {
        [key: string]: any;
    }
    // 允许配置文件使用 `createTheme`
    interface ThemeOptions {
        [key: string]: any;
    }
}

export const myTheme = createTheme({
    palette: {
        primary: {
            main: '#f15a24',
        },
        secondary: {
            main: '#fbb03b',
        },
        text: {
            primary: '#f15a24',
        },
    },
});
