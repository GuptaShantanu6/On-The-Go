import React from "react";
import Button from "./Button";
import { motion } from "framer-motion";

const NewsItems = (props) => {
  let { title, description, imageUrl, newsUrl, dCheck, author, date } = props;
  return (
    <div className="my-3">
      <div className="card shadow">
        <motion.div whileHover={{ scale: 1.07 }}>
          <img
            src={
              imageUrl
                ? imageUrl
                : "https://pbs.twimg.com/profile_images/1108430392267280389/ufmFwzIn_400x400.png"
            }
            className="card-img-top"
            alt="news img"
          />
        </motion.div>
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">
            {description}
            {dCheck === true ? "..." : ""}
          </p>
          <p className="card-text">
            <small className="text-muted">
              By {!author ? "Unknown" : author} on{" "}
              {new Date(date).toGMTString()}
            </small>
          </p>
          <Button href={newsUrl} />
        </div>
      </div>
    </div>
  );
};

export default NewsItems;
