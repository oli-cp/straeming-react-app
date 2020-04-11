import React from "react";
import flv from "flv.js";
import { fetchStream } from "../../actions";
import { connect } from "react-redux";

class StreamShow extends React.Component {
    //constructor method for the video element
    constructor(props) {
        super(props);

        this.videoRef = React.createRef();
    }

    // 3. definition of the function componentDidMount life cycle method, only called once when starting
    componentDidMount() {
        //we pass the id of the stream we want to show (this.props.match.params.id)
        const { id } = this.props.match.params;
        this.props.fetchStream(id);
        this.buildPlayer();
    }

    //called when component re-renders
    componentDidUpdate() {
        this.buildPlayer();
    }

    componentWillUnmount() {
        this.player.destroy();
    }

    buildPlayer() {
        if (this.player || !this.props.stream) {
            return;
        }
        const { id } = this.props.match.params;
        this.player = flv.createPlayer({
            type: "flv",
            url: `http://localhost:8000/live/${id}.flv`
        });
        this.player.attachMediaElement(this.videoRef.current);
        this.player.load();
        //this.player.play();
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
                <video ref={this.videoRef} style={{ width: "100%" }} controls={true} />
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