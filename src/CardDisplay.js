import React, { Component } from 'react';

class CardDisplay extends Component {
    render() {
        const {
            title
        } = this.props
        return (
            <div style={{ margin: "auto" }}>{title}</div>
        );
    }
}
export default CardDisplay