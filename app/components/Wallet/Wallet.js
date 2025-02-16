import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { FormattedNumber } from "react-intl";
import { updateTransferTransactions } from "../../actions/wallet";

import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import styles from "./Wallet.css";

import { WalletIcon, ArrowRightIcon } from "../Icons";
import { dropsToTrx } from "../../utils/currency";

class Wallet extends Component {
  constructor(props) {
    super(props);
  }

  onClick() {
    this._this.props.updateTransactions(this.address);
  }

  render() {
    //console.log('this.props.tokens:', this.props.tokens);
    if(!this.props.tokens){
      this.props.tokens = {};
    }
    let keys = Object.keys(this.props.tokens);
    return (
      <NavLink
        onClick={this.onClick.bind({ _this: this, address: this.props.index })}
        to={"/wallets/walletDetails/" + this.props.index}
        className={styles.wallet}
        activeClassName={styles.active}
      >
        <WalletIcon className={styles.walletIcon} />
        <ul className={styles.walletInfo}>
          <li className={styles.name}>{this.props.name}</li>
          <li className={styles.address}>{this.props.index}</li>
          <li className={styles.token}>
            <FormattedNumber value={dropsToTrx(this.props.trx)} /> TRX
          </li>
          {keys.map((k, i) => {
            if (this.props.tokens[k] > 0) {
              return (
                <li className={styles.token} key={k}>
                  <FormattedNumber
                    formatNumber="decimal"
                    value={this.props.tokens[k]}
                  />{" "}
                  {k}
                </li>
              );
            }
          })}
        </ul>
        <ArrowRightIcon className={styles.arrowIcon} />
      </NavLink>
    );
  }
}

export default withRouter(
  connect(
    state => ({}),
    dispatch => ({
      updateTransactions: address => {
        updateTransferTransactions(address, dispatch);
      }
    })
  )(Wallet)
);
