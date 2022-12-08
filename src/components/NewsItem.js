import React, { Component } from 'react'

export class NewsItem extends Component {
  render() {
    let {title , description , imageUrl , newsUrl , author , date , source} = this.props;
    return (
      <div className='my-3'>
        <div className="card" >
       <div style={{display:'flex', justifyContent:'flex-end',position:'absolute',right:'0'}}>
        <span className=" badge rounded-pill bg-success" style={{fontSize:'12px'}}>
    {source}
    <span className="visually-hidden">unread messages</span>
  </span>
  </div>
  <img src={!imageUrl?"https://st2.depositphotos.com/1186248/5800/i/450/depositphotos_58002091-stock-photo-missing.jpg":imageUrl} className="card-img-top" alt="..."/>
  <div className="card-body">
    <h5 className="card-title">{title}</h5>
    <p className="card-text">{description}...</p>
    <p className='card-text'><small className='text-muted'>By {!author?"Unknown":author} on {new Date(date).toGMTString()}</small></p>
    <a rel="noreferrer" href={newsUrl} target="_blank" className="btn  btn-primary">Read More</a>
  </div>
</div>
      </div>
    )
  }
}

export default NewsItem