import React, { Component } from 'react'
import NewsItem from './NewsItem'
import './css/News.css'
import Spinner from './Spinner'
import propTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';

export class News extends Component {
  //************here are default props which is used when we doesent spesify props in app.js********* */
  static defaultProps = {
    country: 'In',
    pageSize: 8,
    category: 'general'
  }

  //**********here we spesify the types of props ************** */
  static propTypes = {
    country: propTypes.string,
    pageSize: propTypes.number,
    category: propTypes.string
  }

  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  //***********constructor is executed first then static then another functions **************** */
  constructor(props) {
    super(props);
    console.log("Hello this is constructor...")
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0
    }
    document.title = `${this.capitalizeFirstLetter(this.props.category)} - Newswala`;
  }

  async updateNews() {
    this.props.setProgress(0);
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.props.setProgress(20);
    this.setState({ loading: true });
    let data = await fetch(url);
    this.props.setProgress(50);
    let parsedData = await data.json();
    console.log(parsedData);
    this.props.setProgress(70);
    this.setState({

      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false
    });
    this.props.setProgress(100);
  }

  //************API To Fetch Latest News this method runs after render method******************* */
  async componentDidMount() {
    this.updateNews();
  }


  // handlePrevious = async () => {
  //   console.log("handled previous");

  //   this.setState({ page: this.state.page - 1 });
  //   this.updateNews();
  // }

  // handleNext = async () => {
  //   console.log("handled next");
  //   //************math.ceil function returns real number removing decimal point ************** */
  //   if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize))) {

  //     this.setState({ page: this.state.page + 1 });
  //     this.updateNews();
  //   }
  // }

  fetchMoreData = async () => {
    this.setState({ page: this.state.page + 1 });

    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);

    this.setState({

      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,

    })
    this.props.setProgress(100);
  };


  render() {

    return (
      
<>

        {/* if loading true then show spinner ****************** */}




        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner />}
          scrollableTarget="scrollableDiv"
        >
          <div className='container'>
          <div className='newsField'>
            <h2 className='text-center' style={{ marginBottom: '30px' }}>Newswala - Top Headlines from {this.capitalizeFirstLetter(this.props.category)} </h2>
            {this.state.loading && <Spinner />}
            <div className="row">
              {/* {!this.state.loading && this.state.articles.map((element)=>{ */}
              {this.state.articles.map((element) => {
                return <div className="col-md-4" key={element.url}>
                  <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description.slice(0, 85) : ""}
                    imageUrl={element.urlToImage ? element.urlToImage : ""} newsUrl={element.url} date={element.publishedAt} author={element.author} source={element.source.name} />
                </div>
              })}

              {/* <div className='d-flex justify-content-between my-3'>
                <button disabled={this.state.page <= 1} type="button" className="btn btn-dark  btn-padding-y:25rem  btn-padding-x: 8rem  btn-font-size:120rem;" onClick={this.handlePrevious}>&larr;Previous</button>
                <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" id="nextbtn" className="btn btn-dark   btn-padding-y:25rem  btn-padding-x:8rem  btn-font-size:120rem;" onClick={this.handleNext}>Next&rarr;</button>
              </div> */}
            </div>
          </div>
          </div>
        </InfiniteScroll>


        </>
    
    )
  }
}

export default News