import MainContext from './MainContext';

const MainState = (props) => {

    return (

        <MainContext.Provider value={{ a: "10" }}>
            {props.children}
        </MainContext.Provider >

    )

}

export default MainState;