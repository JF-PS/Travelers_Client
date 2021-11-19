import React from 'react'
import BeigeRoundedBtn from '../../components/Buttons/BeigeRoundedBtn'
import Layout from '../../components/Layout/Layout'

const Home = () => {
    return (
        <Layout>
            <BeigeRoundedBtn
                name={"J'ai besoin d'aide"}
                backgroundColor={"#FAF3F0"}
                color={"#EABF9F"} variant={"contained"}
                borderRadius={"50px"}
                borderColor={"#EABF9F"}
                icon="DeleteIcon"
                height="30px"
                width="20px"
            />
        </Layout>
    )
}

export default Home
