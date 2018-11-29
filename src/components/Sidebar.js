import React, { Component } from 'react';

class Sidebar  extends Component{
    state = {
    }

    handleClick = (e) => {
        this.props.handleFilter(e.target.value);
    }

    render(){
        return(
            <div className="row">
                <div className="input-field col s3">
                    <button className="btn-flat waves-effect waves-light" value="Chinese" onClick={this.handleClick}>Chinese</button>
                    <button className="btn-flat waves-effect waves-light" value="Korean" onClick={this.handleClick}>Korean</button>
                    <button className="btn-flat waves-effect waves-light" value="Japanese" onClick={this.handleClick}>Japanese</button>
                    <button className="btn-flat waves-effect waves-light" value="American" onClick={this.handleClick}>American</button>
                    <button className="btn-flat waves-effect waves-light" value="Indian" onClick={this.handleClick}>Indian</button>
                    <button className="btn-flat waves-effect waves-light" value="Italian" onClick={this.handleClick}>Italian</button>
                    <button className="btn-flat waves-effect waves-light" value="Thai" onClick={this.handleClick}>Thai</button>
                    <button className="btn-flat waves-effect waves-light" value="Desert" onClick={this.handleClick}>Dessert</button>
                </div>
            </div>
        );
    }
}

export default Sidebar;