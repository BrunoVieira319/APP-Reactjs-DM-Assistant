import React from "react";
import { Subscribe } from "unstated";
import StateComponent from "./StateComponent.js";

const withSubscribe = (Componente) => {
    class HOC extends React.Component {
        render = () => (
            <Subscribe to={[StateComponent]}>
                { container => <Componente {...this.props} container={container}  /> }
            </Subscribe>    
        )
    }

    return HOC;
}

export default withSubscribe;