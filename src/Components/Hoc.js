import React from "react";
import { connect } from "react-redux";
import { useEffect,useState } from "react";
import InvalidLogin from "./InvalidLogin";
const Hoc = (Component) => {
    return class extends React.Component{
        render(){
            return(
                <div>
                    {true ? <Component/> : <h1>please Login</h1>}
                </div>
            )
        }
    }
}
  const mapStateToProps = state => ({
    activity: state.userActivityreducer.payload,
  });

export default (Hoc);
