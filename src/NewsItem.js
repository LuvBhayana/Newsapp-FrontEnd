import React, { Component } from 'react'

export class NewsItem extends Component {

  render() {
    let { title, description, imageUrl, newsUrl, author, date } = this.props;
    return (
      <div className="card" style={{ width: "18rem" }}>
        <img src={!imageUrl ? "https://i.ytimg.com/vi/n8YKORFSQL8/maxresdefault.jpg" : imageUrl} className="card-img-top" alt="..."></img>
        <div className="card-body">
          <h5 className="card-title">{title}
            <span class="position-absolute top-0 start-100 translate-middle p-2 bg-danger border border-light rounded-circle">
              <span class="visually-hidden">New alerts</span>
            </span>
          </h5>
          <p className="card-text">{description}...</p>
          <p className='card-text'><small class="text-muted">By {!author ? "Unknown" : author} on {date} on 3 mins ago</small></p>
          <a href={newsUrl} target='_blank' className="btn btn-sm btn-dark">Read more </a>
        </div>
      </div>
    )
  }
}

export default NewsItem
