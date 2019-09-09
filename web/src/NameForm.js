import React from 'react';

class NameForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: ''};

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        const { cb } = this.props;
        this.setState({value: event.target.value});
        cb && cb(event.target.value);
    }

    render() {
        return (
            <form id="name-form" className="col-md-6">
                <div className="form-group">
                    <label htmlFor="name-field">Your Name</label>
                    <input
                        type="text"
                        id="name-field"
                        className="form-control"
                        value={this.state.value}
                        onChange={this.handleChange}
                    />
                </div>
            </form>
        )
    }
}

export default NameForm;