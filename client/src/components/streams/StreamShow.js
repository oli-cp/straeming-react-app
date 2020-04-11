import React from "react";
import { fetchStream } from "../../actions";
import { connect } from "react-redux";

class StreamShow extends React.Component {
    // 3. definition of the function componentDidMount life cycle method
    componentDidMount() {
        //we pass the id of the stream we want to show (this.props.match.params.id)
        this.props.fetchStream(this.props.match.params.id);
    }

    // 1. definition of render method
    render() {
        if (!this.props.stream) {
            return <div>Loading...</div>
        }

        //Refactor with ES2015:
        const { title, description } = this.props.stream;

        return (
            <div>
                <h1>{title}</h1>
                <h5>{description}</h5>
            </div>
        )

    }
}

// 4. get the stream out of the redux store and get it inside of the component
const mapStateToProps = (state, ownProps) => {
    return {
        stream: state.streams[ownProps.match.params.id]
    }
}

//2. connect the action imported creator to the component
export default connect(mapStateToProps, { fetchStream })(StreamShow);