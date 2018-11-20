import React from 'react';

import styles from './style.scss';


class Detail extends React.Component {
  constructor(props) {
    super(props)
 };

// **********************
// HANDLERS
// **********************

  render() {
    console.log("detail", this.props.clicked);

    return (
        <div className={styles.main}>

        </div>
    );
  }
}

export default Detail;