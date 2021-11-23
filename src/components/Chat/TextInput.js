import React from 'react'
import TextField from '@material-ui/core/TextField';
import { createStyles, makeStyles } from "@material-ui/core/styles";
import SendIcon from '@material-ui/icons/Send';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) =>
  createStyles({
    wrapForm : {
        display: "flex",
        justifyContent: "center",
        width: "95%",
        margin: `${theme.spacing(0)} auto`
    },
    wrapText  : {
        width: "100%"
    },
    button: {
        //margin: theme.spacing(1),
    },
  })
);

export const TextInput = ({ handleMessageSubmit, handleTextChange, currentMessage }) => {
    const classes = useStyles();
    return (
        <>
            <form className={classes.wrapForm} onSubmit={handleMessageSubmit}  noValidate autoComplete="off">
                <TextField
                    id="standard-text"
                    label="Chat du voyageur"
                    name="message"
                    className={classes.wrapText}
                    value={currentMessage["message"]}
                    onChange={(e) => handleTextChange(e)}
                />
                <Button variant="contained" color="primary" type="submit" className={classes.button}>
                    <SendIcon />
                </Button>
            </form>
        </>
    )
}



