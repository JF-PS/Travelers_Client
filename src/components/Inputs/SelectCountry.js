import React from "react";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import France from "../../assets/flags/france.png";
import Allemagne from "../../assets/flags/germany.png";
import Suisse from "../../assets/flags/switzerland.png";

const countries = [
    {
      label: "France",
      src: France,
      link: " ",
      value: "FR"
    },
    {
      label: "Allemagne",
      src: Allemagne,
      link: " ",
      value: "DE"
    },
    {
      label: "Suisse",
      src: Suisse,
      link: " ",
      value: "CH"
    }
];

const SelectCountry = () => {
    const [country, setCountry] = React.useState(France);
  const [open, setOpen] = React.useState(false);

  const handleChange = event => {
    setCountry(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
<>
        <InputLabel htmlFor="open-select" />
        <Select
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={country}
          name="country"
          onChange={handleChange}
          inputProps={{
            id: "open-select"
          }}
        >
          {countries.map((option, key) => (
            <MenuItem value={option.src} key={key}>
              <img src={option.src} alt={option.label} />{" "}
            </MenuItem>
          ))}
        </Select>
        </>
  );
}

export default SelectCountry
