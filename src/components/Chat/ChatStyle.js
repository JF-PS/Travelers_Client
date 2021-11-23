import { createTheme } from '@material-ui/core/styles'

const CustomDatePickerStyle = createTheme({
    paper: {
        width: "100%",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        position: "relative"
    },
    paper2: {
        width: "80vw",
        maxWidth: "500px",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        position: "relative"
    },
    container: {
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    messagesBody: {
        width: "calc( 100% - 20px )",
        margin: 10,
        overflowY: "scroll",
        height: "calc( 100% - 80px )"
    }
})

export default CustomDatePickerStyle;