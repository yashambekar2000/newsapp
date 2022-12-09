// import React, { Component } from 'react'
import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import './css/News.css'
import Spinner from './Spinner'
import propTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';

// export class News extends Component {
//************here are default props which is used when we doesent spesify props in app.js********* */

const News = (props) => {

  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)
  // const [category, setCategory] = useState('general')
  // const [pageSize, setPageSize] = useState(8)
  // const [country, setCountry] = useState('In')

  // static defaultProps = {
  //   country: 'In',
  //   pageSize: 8,
  //   category: 'general'
  // }

  // //**********here we spesify the types of props ************** */
  // static propTypes = {
  //   country: propTypes.string,
  //   pageSize: propTypes.number,
  //   category: propTypes.string
  // }

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  //***********constructor is executed first then static then another functions **************** */
  // constructor(props) {
  //   super(props);
  //   console.log("Hello this is constructor...")
  //   this.state = {
  //     articles: [],
  //     loading: true,
  //     page: 1,
  //     totalResults: 0
  //   }
  //   document.title = `${this.capitalizeFirstLetter(props.category)} - Newswala`;
  // }

  const updateNews = async () => {
    props.setProgress(0);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    props.setProgress(20);
    // setState({ loading: true });
    setLoading(true);
    let data = await fetch(url);
    props.setProgress(50);
    let parsedData = await data.json();
    console.log(parsedData);
    props.setProgress(70);
    // this.setState({

    //   articles: parsedData.articles,
    //   totalResults: parsedData.totalResults,
    //   loading: false
    // });

    setArticles(parsedData.articles);
    setTotalResults(parsedData.totalResults);
    setLoading(false);

    props.setProgress(100);
  }

  //************API To Fetch Latest News this method runs after render method******************* */

  useEffect(() => {
    document.title = `${capitalizeFirstLetter(props.category)} - Newswala`;
    updateNews();
  }, [])

  // async componentDidMount() {
  //   this.updateNews();
  // }


  // handlePrevious = async () => {
  //   console.log("handled previous");

  //   this.setState({ page: this.state.page - 1 });
  //   this.updateNews();
  // }

  // handleNext = async () => {
  //   console.log("handled next");
  //   //************math.ceil function returns real number removing decimal point ************** */
  //   if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / props.pageSize))) {

  //     this.setState({ page: this.state.page + 1 });
  //     this.updateNews();
  //   }
  // }

  const fetchMoreData = async () => {
    // setState({ page: page + 1 });
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page + 1}&pageSize=${props.pageSize}`;
    setPage(page + 1);
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);

    setArticles(articles.concat(parsedData.articles));
    setTotalResults(parsedData.totalResults);
    // setState({

    //   articles: articles.concat(parsedData.articles),
    //   totalResults: parsedData.totalResults,

    // })
    props.setProgress(100);
  };


  // render() {

  return (

    <>

      {/* if loading true then show spinner ****************** */}




      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={<Spinner />}
        scrollableTarget="scrollableDiv"
      >
        <div className='container'>
          <div className='newsField'>
            <h2 className='text-center' style={{ marginBottom: '30px' }}>Newswala - Top Headlines from {capitalizeFirstLetter(props.category)} </h2>
            {loading && <Spinner />}
            <div className="row">
              {/* {!this.state.loading && this.state.articles.map((element)=>{ */}
              {articles.map((element) => {
                return <div className="col-md-4" key={element.url}>
                  <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description.slice(0, 85) : ""}
                    imageUrl={element.urlToImage ? element.urlToImage : ""} newsUrl={element.url} date={element.publishedAt} author={element.author} source={element.source.name} />
                </div>
              })}

              {/* <div className='d-flex justify-content-between my-3'>
                <button disabled={this.state.page <= 1} type="button" className="btn btn-dark  btn-padding-y:25rem  btn-padding-x: 8rem  btn-font-size:120rem;" onClick={this.handlePrevious}>&larr;Previous</button>
                <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / props.pageSize)} type="button" id="nextbtn" className="btn btn-dark   btn-padding-y:25rem  btn-padding-x:8rem  btn-font-size:120rem;" onClick={this.handleNext}>Next&rarr;</button>
              </div> */}
            </div>
          </div>
        </div>
      </InfiniteScroll>


    </>

  )
}
// }

News.defaultProps = {
  country: 'In',
  pageSize: 8,
  category: 'general'
}

//**********here we spesify the types of props ************** */
News.propTypes = {
  country: propTypes.string,
  pageSize: propTypes.number,
  category: propTypes.string
}

export default News