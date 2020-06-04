import React, { Component } from "react";
import { StyleProp, Text, TextStyle } from "react-native";
import { connect } from "react-redux";
import { ApplicationState } from "src/store";

interface HeaderTitleState {}

interface HeaderTitleProps {
  style?: StyleProp<TextStyle>;
}

type Props = HeaderTitleProps & ApplicationState;

class HeaderTitleComp extends Component<Props, HeaderTitleState> {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Text
        style={[
          this.props.style,
          { color: "#fff", fontWeight: "bold", fontSize: 20 },
        ]}
      >
        {this.props.Department.current
          ? this.props.Department.current.DEPARTMENTNAME +
            (this.props.Department.currentTable
              ? " - " + this.props.Department.currentTable.TABLENO
              : "")
          : "Electra POS"}
      </Text>
    );
  }
}

export const HeaderTitle = connect(
  (state: ApplicationState) => state,
  (dispatch) => {
    return {};
  }
)(HeaderTitleComp);
