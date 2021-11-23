import Center from "./Center";
import { render, screen } from "@testing-library/react";
import React from "react";


test('Test1', () => {
  
    render(
        <Center>
            <div id='demo'></div>
         </Center>
    )

    const demo = document.querySelector('#demo');
    expect(demo).not.toBeNull();
});

test('Test2', () => {

    render(
        <Center title='Bonjour'>
            <div id='demo'>Yo</div>
         </Center>
    )
    const title = screen.getByText('Bonjour');
    expect(title).toBeInTheDocument();
});


