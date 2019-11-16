import React from 'react';
import './App.css';
import Songs from "./Songs";
import {ThemeProvider} from '@material-ui/styles';
import {createMuiTheme} from "@material-ui/core";

const App: React.FC = () => {

    const theme = createMuiTheme({
        typography: {
            fontFamily: '"Alef", sans-serif',
        },
        palette: {
            primary: {main: '#262c2e'},
            secondary: {main: '#2c3336'},
            text: {
                secondary: '#333333',
            },
        },
    });

    return (
        <ThemeProvider theme={theme}>
            <div className="App">
                <div className="App-header">
                    <Songs/>
                </div>
            </div>
        </ThemeProvider>
    );
};

export default App;
