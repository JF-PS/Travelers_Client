import ButtonGeneric from "./ButtonGeneric";
import { render, screen } from "@testing-library/react";
import React from "react";

/* Check if the button get correctly the name value */
test('valueOfButtonOk', () => {
    render(
        <ButtonGeneric
            name={"Jai besoin d aide"}
            backgroundColor={"#FAF3F0"}
            color={"#EABF9F"}
            variant={"contained"}
            borderRadius={"50px"}
            borderColor={"#EABF9F"}
        />
    )
    const name = screen.getByText('Jai besoin d aide');
    expect(name).toBeInTheDocument();
});


