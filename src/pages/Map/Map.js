import Layout from '../../components/Layout/Layout'
import Map from '../../components/Map/Map'
import SlideButton from '../../components/SlideButton/SlideButton'
import NavBar from '../../components/NavBar/NavBar';


const PageMap = () => {
    return (
      <>
        <Layout>
          <Map >
              <SlideButton></SlideButton>
          </Map>
        </Layout>

        <NavBar></NavBar>
      </>
    )
}

export default PageMap