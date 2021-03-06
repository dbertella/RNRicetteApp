'use strict';

var React = require('react-native');
var {
  Component,
} = React;

//var ResourceKeys = require('../constants/ResourceKeys');
//var DataService = require('../services/DataService');
var RecipeSingle = require('./RecipeSingle');
var BaseList = require('./BaseList');
var FavoriteStore = require('./../stores/FavoriteStore');
var RecipeStore = require('../stores/RecipeStore')
var { filter, find } = require('lodash');


class FavoritesList extends Component {
  constructor(props) {
    super(props);
    this.changeListener = null;
    this.state = {
      dataSource: [],
    }
  } 

  componentWillUnmount() {
    FavoriteStore.removeChangeListener(this.changeListener);
  }
  
  componentDidMount() {
    this.changeListener = this.reloadFavorite.bind(this);
    FavoriteStore.addChangeListener(this.changeListener);
    this.reloadFavorite();
  }

  reloadFavorite() {

    RecipeStore.getFavorites()
      .then((recipes) => { 
        this.setState({ dataSource: recipes });
      });

    // DataService.getData(ResourceKeys.recipes).then((responseData) => {
    //   FavoriteStore.getAll().then((favorites) => {
    //     var favoritesRecipes = [];
    //     favorites.forEach((item, index) => {    
    //       favoritesRecipes.push(find(responseData, { ID: item.id }));
    //     });
    //     this.setState({
    //       dataSource: favoritesRecipes,
    //     });
    //   });
    // });
  }

  render() {
   
    return (
      <BaseList
        recipesSource={this.state.dataSource}
        navigator={this.props.navigator} />
    );
  }

}

module.exports = FavoritesList;
