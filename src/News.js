import React, { Component } from 'react'
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types'

export class News extends Component {
  static defaultProps = {
    country : 'in',
    pageSize : 6
  }
  static Props = {
    country : PropTypes.string,
    pageSize : PropTypes
  }
  constructor(){
    super();
    console.log("hello I'm a constructor")
    this.state={
      articles : [],
      totalResults:2,
      loading : true ,
      page:1
    }
  
  // document.title = this.props.category
  }

  async componentDidMount(){
    function capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
  }
  
    document.title = `${capitalizeFirstLetter(this.props.category)}`;
    console.log("yes");
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=056c083068124de8980fb7636294c016&page=1&pageSize=${this.props.pageSize}`;
    this.setState({loading:true});
    let data = await fetch(url);
    fetch(url).then((res)=>res.json()).then((json)=>{
      this.setState({
        articles:json.articles,
        loading:false
      });
    })
    let parsedData = await data.json()
    console.log(parsedData);
    this.setState(this.articles=parsedData.articles)
  }
  async handlePrevClick(e){
    console.log("prev");
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=056c083068124de8980fb7636294c016&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
    this.setState({loading:true});
    let data = await fetch(url);
    fetch(url).then((res)=>res.json()).then((json)=>{
      this.setState({
        loading:false,
        page: this.state.page - 1,
        articles:json.articles
      });
    })
  }
   async handleNextClick(e){
    console.log("next");
    // if(Math.ceil(this.state.totalResults/20))
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=056c083068124de8980fb7636294c016&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
    this.setState({loading:true});
    let data = await fetch(url);
    fetch(url).then((res)=>res.json()).then((json)=>{
      this.setState({
        loading:false,
        page: this.state.page + 1,
        articles:json.articles
      });
    })
  }
  render() {
    return (
      <div className="container my-3">
         <h2 className="text-center" style ={{margin:'35px'}} > NEWS HEADLINES</h2>
         {this.state.loading && <Spinner/>}
        <div className='row'>
        {!this.state.loading && this.state.articles.map((element)=>{
          return <div className='col-md-4' key={element.url}>
           <NewsItem title={element.title!=null?element.title.slice(0,35):""} description={element.description!=null?element.description.slice(0,89):""} 
           imageUrl={element.urlToImage} newsUrl = {element.url} author={element.author} date={element.publishedAt}/>
           </div>
  })}
      <div className="container d-flex justify-content-between">
      <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick.bind(this)} > &larr; Previous</button>
      <button type="button" className="btn btn-dark" onClick={this.handleNextClick.bind(this)}>Next &rarr;</button>
      </div>
      </div>
      </div>
    )
  }
}
export default News

