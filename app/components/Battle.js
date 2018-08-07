import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import PlayerPreview from './PlayerPreview';


class PlayerInput extends React.Component {
    static propTypes = {
        id: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        onSubmit: PropTypes.func.isRequired
    }

    static defaultProps = {
        label: 'Username'
    }

    state = {
        username : ''
    }

    handleChange = (e) => {
        const value = e.target.value;
        this.setState({
            username: value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();

        this.props.onSubmit(this.props.id, this.state.username)
    }

    render() {
        return (
            <form className = 'column' onSubmit = {this.handleSubmit}>
                <label className = 'header' htmlFor = 'username'>
                    {this.props.label}
                </label>
                <input
                    id = 'username'
                    placeholder = 'github username'
                    type = 'text'
                    autoComplete = 'off'
                    value = {this.state.username}
                    onChange = {this.handleChange}
                />
                <button
                    className = 'button'
                    type = 'submit'
                    disabled = {!this.state.username}>
                        Submit 
                </button>
            </form>
        )
    }
}

class Battle extends React.Component {
  
    state = {
        playerOneName: '',
        playerOneImage: null,
        playerTwoName: '',
        playerTwoImage: null
    }

    handleSubmit = (id, username) => {
        this.setState({
            [id + 'Name'] : username,
            [id + 'Image'] : `http://github.com/${username}.png?size=200`
        })
    }

    handleReset = (id) => {
        this.setState({
            [id + 'Name'] : '',
            [id + 'Image'] : null
        })
    }

    render() {
        const match = this.props.match;
        const {playerOneName, playerTwoName, playerOneImage, playerTwoImage } = this.state;

        return (
            <div>
                <div className = 'row'>
                    {!playerOneName && 
                        <PlayerInput 
                            id = 'playerOne'
                            label = 'Player One'
                            onSubmit = {this.handleSubmit}
                        />}

                    {playerOneImage !== null &&
                        <PlayerPreview
                            avatar = {playerOneImage}
                            username = {playerOneName}
                        >
                            <button
                                className = 'reset'
                                onClick = {() => this.handleReset('playerOne')}>
                                    Reset 
                            </button>
                        
                        </PlayerPreview>}
                    
                    {!playerTwoName && 
                        <PlayerInput 
                            id = 'playerTwo'
                            label = 'Player Two'
                            onSubmit = {this.handleSubmit}
                        />}

                    {playerTwoImage !== null &&
                        <PlayerPreview
                            avatar = {playerTwoImage}
                            username = {playerTwoName}
                        >
                            <button
                                className = 'reset'
                                onClick = {() => this.handleReset('playerTwo')}>
                                    Reset 
                            </button>
                        </PlayerPreview>}    
                </div>

                {playerOneImage && playerTwoImage &&
                    <Link
                        className = 'button'
                        to = {{
                            pathname: match.url + '/results',
                            search: `?playerOneName=${playerOneName}&playerTwoName=${playerTwoName}`
                        }}>
                            Battle
                    </Link>}
            </div>
        )} 
}

export default Battle;
