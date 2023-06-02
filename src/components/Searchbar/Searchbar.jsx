import React, { Component } from 'react';
import PropTypes from 'prop-types';
import css from './Searchbar.module.css'

class Searchbar extends Component {
    state = {
        query: "",
    };

    handleChange = event => {
        this.setState({query: event.target.value})
    }

    handleSubmit = (e) => {
        e.preventDefault()
        if (!this.state.query.trim()) { 
            return
          }
          this.props.onSubmit(this.state.query);
    }

    render(){
        return (
            <header className={css.Searchbar}>
                <form className={css.SearchForm} onSubmit = {this.handleSubmit}>
                    <button type="submit" className={css.SearchForm_button}>
                        <span className={css.SearchForm_button_label}>Search</span>
                    </button>
    
                    <input
                        className={css.SearchForm_input}
                        onChange = {this.handleChange}
                        type="text"
                        autoComplete="off"
                        autoFocus
                        placeholder="Search images and photos"
                        value={this.state.query}
                    />
                </form>
            </header>
        )
    }
}

export default Searchbar

Searchbar.propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };