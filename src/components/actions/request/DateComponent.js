import React from 'react';
import dateFormat from 'dateformat';

export class DateComponent extends React.Component {
    constructor() {
        super();

        var today = new Date(),
            date = dateFormat(today, "yyyy-mm-dd");

        this.state = {
            date: date
        };
    }

    componentDidMount() {
        this.props.onSetDate(this.state.date);
    }

    render() {
        return (
            <div className='date' style={{float: 'right', fontWeight:'bold', color: '#6c757d',fontStyle:'italic'}}>
                {this.state.date}
            </div>
        );
    }
}