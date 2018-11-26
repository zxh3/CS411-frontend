import React, { Component } from 'react';

class Sidebar  extends Component{
    state = {
    }

    handleClick = (e) => {
        console.log(e.target.value);
        this.props.handleFilter(e.target.value);
    }

    render(){
        return(
            // <div><p>random number : { Math.random() }</p></div>
            <div className="row">
                <div className="input-field col s3">
                    <button className="btn-flat waves-effect waves-light" value="Chinese" onClick={this.handleClick}>Chinese</button>
                    <button className="btn-flat waves-effect waves-light" value="Korean" onClick={this.handleClick}>Korean</button>
                    <button className="btn-flat waves-effect waves-light" value="Japanese" onClick={this.handleClick}>Japanese</button>
                    <button className="btn-flat waves-effect waves-light" value="American" onClick={this.handleClick}>American</button>
                    <button className="btn-flat waves-effect waves-light" value="Indian" onClick={this.handleClick}>Indian</button>
                    <button className="btn-flat waves-effect waves-light" value="Italian" onClick={this.handleClick}>Italian</button>
                    <button className="btn-flat waves-effect waves-light" value="Thai" onClick={this.handleClick}>Thai</button>
                </div>
            </div>
        );
    }
}

export default Sidebar;