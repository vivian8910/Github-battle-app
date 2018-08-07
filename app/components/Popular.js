import React from 'react';
import PropTypes from 'prop-types';
import { fetchPopularRepos } from '../utils/api';
import Loading from './Loading';

function SelectedLanguage(props){
    const languages = ['All', 'Javascript', 'Ruby', 'Java', 'CSS', 'Python'];
    return (
        <div>
            <ul className = 'container_ul'>
                {languages.map((language) => (
                    <li 
                        style = {language === props.selectedLanguage ? {color: '#d0021b'} : null}
                        onClick = {() => props.onSelect(language)} 
                        key = {language}>
                        {language}
                    </li>
                ))}  
            </ul>
        </div>
    )
    
}

function RepoGrid(props) {
    return (
        <ul className = 'popular_list'>
            {props.repos.map(({name, stargazers_count, owner, html_url}, index) => (
                <li key = {name} className = 'popular_item'>
                    <div className = 'popular_rank'>#{index+1}</div>
                    <ul className = 'space_list_items'>
                        <li>
                            <img
                                className = 'avatar'
                                src = {owner.avatar_url}
                                alt = {'Avatar for' + owner.login} 
                            />
                        </li>
                        <li><a href = {html_url}>{name}</a></li>
                        <li>@{owner.login}</li>
                        <li>{stargazers_count} stars</li>
                    </ul>
                </li>
                
            ))}
        </ul>
    )
}

RepoGrid.propTypes = {
    repos: PropTypes.array.isRequired
}

SelectedLanguage.propTypes = {
    selectedLanguage: PropTypes.string.isRequired,
    onSelect: PropTypes.func.isRequired
}

class Popular extends React.Component {
    state = {
        selectedLanguage :'All', //default language shown on the screen
        repos: null
    }

    componentDidMount() {
        this.updateLanguage(this.state.selectedLanguage);
    }

    updateLanguage = async (lang) => {
        this.setState({
            selectedLanguage : lang,
            repos: null
        });

        const repos = await fetchPopularRepos(lang);
        this.setState({repos: repos});
    
    }

    
    render () {
        return (
            <div>
                <SelectedLanguage 
                    selectedLanguage = {this.state.selectedLanguage}
                    onSelect = {this.updateLanguage}
                />
                {!this.state.repos ? <Loading /> : <RepoGrid repos = {this.state.repos} />}
                
            </div>
        )
    }
}

export default Popular;