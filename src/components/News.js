import React, { useEffect, useState } from "react";
import NewsItems from "./NewsItems";
import apiKey from "../apiKeyJs.mjs";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const capitalizeFirstLetter = (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  };

  document.title = `${capitalizeFirstLetter(props.category)} - News`;

  // articles = [];
  let dCheck = false;

  const updateNews = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${apiKey}&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true);
    fetch(url)
      .then((res) => res.json())
      .then((out) => {
        setArticles(out.articles);
        setTotalResults(out.totalResults);
        setLoading(false);
      })
      .catch((err) => {
        throw err;
      });
  };

  useEffect(() => {
    setPage(1);
    updateNews();
    // eslint-disable-line
  }, []);

  const fetchMoreData = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${
      props.country
    }&category=${props.category}&apiKey=${apiKey}&page=${page + 1}&pageSize=${
      props.pageSize
    }`;
    setPage(page + 1);
    setLoading(true);
    fetch(url)
      .then((res) => res.json())
      .then((out) => {
        setArticles(articles.concat(out.articles));
        setTotalResults(out.totalResults);
        setLoading(false);
      })
      .catch((err) => {
        throw err;
      });
  };

  return (
    <div className="container my-3">
      <h2
        className="rounded bg-light"
        style={{ display: `inline`, color: `black` }}
      >
        {capitalizeFirstLetter(props.category)} - Top Headlines
      </h2>
      {loading && <Spinner />}
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={<Spinner />}
      >
        <div className="container">
          <div className="row">
            {articles.map((element) => {
              if (element.description && element.description.length > 88) {
                dCheck = true;
              }
              return (
                <div className="col-md-4">
                  <NewsItems
                    key={element.url}
                    title={element.title ? element.title : ""}
                    description={
                      element.description
                        ? element.description.slice(0, 88)
                        : ""
                    }
                    imageUrl={element.urlToImage}
                    newsUrl={element.url}
                    dCheck={dCheck}
                    author={element.author}
                    date={element.publishedAt}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </InfiniteScroll>
    </div>
  );
};

News.defaultProps = {
  country: "in",
  pageSize: 8,
  category: "general",
  cat: "general",
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};

export default News;
