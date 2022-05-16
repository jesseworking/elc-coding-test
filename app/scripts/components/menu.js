/**
 * This file will hold the Menu that lives at the top of the Page, this is all rendered using a React Component...
 * 
 */
import React from 'react';
import debounce from 'lodash/debounce';
import Product from './product';
import { endpoint } from '../../utils/api';

class Menu extends React.Component {

    /**
    * Main constructor for the Menu Class
    * @memberof Menu
    */
    constructor() {
        super();
        this.state = {
            result: null,
            isLoading: false,
            error: "",
            showingSearch: false
        };
        this.searchRef = React.createRef();
        this.getDataFromApi = debounce(this.getDataFromApi.bind(this), 500);
    }

    /**
    * Shows or hides the search container
    * @memberof Menu
    * @param e [Object] - the event from a click handler
    */
    showSearchContainer(e) {
        e.preventDefault();
        this.setState({
            showingSearch: !this.state.showingSearch
        });
        if (this.searchRef && this.searchRef.current) {
            this.searchRef.current.focus();
            this.searchRef.current.value = "";
        }
    }

    /**
    * Calls upon search close
    * @memberof Menu
    * @param e [Object] - the event from a search close handler
    */
    onClose(e) {
        e.preventDefault();
        this.setState({
            result: null,
            isLoading: false,
            error: "",
            showingSearch: false
        })
    }

    /**
    * Calls upon search change
    * @memberof Menu
    * @param e [Object] - the event from a text change handler
    */
    onSearch(e) {
        const searchString = e.target.value;
        this.getDataFromApi(searchString)    
    };

    getDataFromApi(searchString) {
        this.setState({ isLoading: true });
        try {
            const searchUrl = `${endpoint}/?search=${searchString}`;
            return fetch(searchUrl)
                .then((res) => {
                    if (res.status >= 400) {
                        throw new Error('Server responds with error.');
                    }
                    return res.json();
                })
                .then((result) => {
                    this.setState({ result, isLoading: false });
                });
        } catch(error) {
            this.setState({ error, isLoading: false });
        }
    }

    renderSearchStatus(msg) {
        return (
            <div className='search-status'>
                {msg}
            </div>
        )
    }

    renderResult() {
        const { error, isLoading, result } = this.state;

        if (error) {
            return this.renderSearchStatus(error);
        }

        if (isLoading) {
            return this.renderSearchStatus('Loading...');
        }

        if (result && result.length === 0) {
            return this.renderSearchStatus('There are no results. Please try to search other products.');
        }
        
        return (
            <div className={result ? "search-list" : ""}>
                {result && result.map((item) => (
                    <Product
                        key={item._id}
                        name={item.name}
                        picture={item.picture}
                        price={item.price}
                        about={item.about}
                        active={item.isActive === "true"}
                    />
                ))}
            </div>
        )
    }

    /**
    * Renders the default app in the window, we have assigned this to an element called root.
    * 
    * @returns JSX
    * @memberof App
    */
    render() {
        const { showingSearch } = this.state;

        return (
            <header className="menu">
                <div className="menu-container">
                    <div className="menu-holder">
                        <h1>ELC</h1>
                        <nav>
                            <a href="#" className="nav-item">HOLIDAY</a>
                            <a href="#" className="nav-item">WHAT'S NEW</a>
                            <a href="#" className="nav-item">PRODUCTS</a>
                            <a href="#" className="nav-item">BESTSELLERS</a>
                            <a href="#" className="nav-item">GOODBYES</a>
                            <a href="#" className="nav-item">STORES</a>
                            <a href="#" className="nav-item">INSPIRATION</a>

                            <a href="#" onClick={(e) => this.showSearchContainer(e)}>
                                <i className="material-icons search">search</i>
                            </a>
                        </nav>
                    </div>
                </div>
                <div className={(showingSearch ? "showing " : "") + "search-container"}>
                    <input ref={this.searchRef} type="text" onChange={(e) => this.onSearch(e)} />
                    <a href="#" onClick={(e) => this.onClose(e)}>
                        <i className="material-icons close">close</i>
                    </a>
                    {this.renderResult()}
                </div>
            </header>
        );
    }
}

// Export out the React Component
module.exports = Menu;