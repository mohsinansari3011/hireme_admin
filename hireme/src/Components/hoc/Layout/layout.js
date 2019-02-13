import React, { Component } from 'react';
import './layout.css'

import Header from '../../Header/header';
import Footer from '../../Footer/footer';



class layout extends Component {

    state = {
        showNav: false
    }

    togglesidenav = (action) => {
        this.setState({
            showNav: action
        })
    }

    render() {
        return (
            <div>
                < Header
                    user={this.props.user}
                    showNav={this.state.showNav}
                    onHideNav={() => this.togglesidenav(false)}
                    onOpenNav={() => this.togglesidenav(true)}
                />
                {this.props.children}
                < Footer />
            </div>
        );
    }
}

export default layout;