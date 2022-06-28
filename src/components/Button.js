import { motion } from "framer-motion";

import React, { Component } from "react";

class Button extends Component {
  render() {
    return (
      <div className="example-container">
        <a
          className="readMore"
          href={this.props.href}
          target="_blank"
          rel="noreferrer"
        >
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <span className="readMore">Read More</span>
          </motion.div>
        </a>
      </div>
    );
  }
}

export default Button;
