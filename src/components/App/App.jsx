import React from 'react';
import GameBoard from "../GameBoard/GameBoard";
import tw from "tailwind-styled-components"
function App() {
    return (
        <Container><GameBoard/></Container>
    );
}
const Container = tw.div`h-screen flex items-center justify-center bg-gray-50`
export default App;