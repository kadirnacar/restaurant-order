import { BackImage, LoaderSpinner } from "@components";
import { NavigationProp } from "@react-navigation/native";
import { DepartmentActions } from "@reducers";
import { ApplicationState } from "@store";
import { colors, styles } from "@tools";
import ColorScheme from "color-scheme";
import LottieView from "lottie-react-native";
import React, { Component } from "react";
import {
  Dimensions,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { RNCamera } from "react-native-camera";
import BarcodeMask from "react-native-barcode-mask";
import { IStok } from "@models";

const { width } = Dimensions.get("window");

interface BarcodeScreenState {
  barcode?: string;
  product?: IStok;
}

interface BarcodeProps {
  DepartmentActions: typeof DepartmentActions;
  navigation: NavigationProp<any>;
}

type Props = BarcodeProps & ApplicationState;

export class BarcodeScreenComp extends Component<Props, BarcodeScreenState> {
  constructor(props) {
    super(props);
    this.state = { barcode: "" };
  }

  async componentDidMount() {
    // this.setState({ product: this.props.Stok.stoks[0] });
  }
  render() {
    return (
      <BackImage>
        <LoaderSpinner showLoader={this.props.Department.isRequest} />
        <RNCamera
          style={{
            flex: 1,
            justifyContent: "flex-end",
            alignItems: "center",
          }}
          captureAudio={false}
          type={RNCamera.Constants.Type.back}
          androidCameraPermissionOptions={{
            title: "Permission to use camera",
            message: "We need your permission to use your camera",
            buttonPositive: "Ok",
            buttonNegative: "Cancel",
          }}
          onBarCodeRead={(evt) => {
            if (
              evt.data != this.state.barcode &&
              this.props.Stok &&
              this.props.Stok.stokBarcodes
            ) {
              const barcodeProduct = this.props.Stok.stokBarcodes.find(
                (x) => x.BARCODE == evt.data
              );
              if (barcodeProduct && this.props.Stok && this.props.Stok.stoks) {
                const product = this.props.Stok.stoks.find((x) =>
                  this.props.Stok.stokDepartments &&
                  this.props.Department.current
                    ? this.props.Stok.stokDepartments.findIndex(
                        (d) =>
                          d.DEPID == this.props.Department.current.ID &&
                          x.ID == barcodeProduct.PRODUCTID &&
                          d.PRODUCTID == x.ID
                      ) > -1
                    : false
                );
                if (product) {
                  this.setState({ product: product, barcode: evt.data });
                }
              }
            }
            this.setState({ barcode: evt.data });
          }}
          onGoogleVisionBarcodesDetected={({ barcodes }) => {
            const barcode =
              barcodes && barcodes.length > 0 ? barcodes[0].data : null;
            if (
              barcode &&
              barcode != this.state.barcode &&
              this.props.Stok &&
              this.props.Stok.stokBarcodes
            ) {
              const barcodeProduct = this.props.Stok.stokBarcodes.find(
                (x) => x.BARCODE == barcode
              );
              if (barcodeProduct && this.props.Stok && this.props.Stok.stoks) {
                const product = this.props.Stok.stoks.find((x) =>
                  this.props.Stok.stokDepartments &&
                  this.props.Department.current
                    ? this.props.Stok.stokDepartments.findIndex(
                        (d) =>
                          d.DEPID == this.props.Department.current.ID &&
                          x.ID == barcodeProduct.PRODUCTID &&
                          d.PRODUCTID == x.ID
                      ) > -1
                    : false
                );
                if (product) {
                  this.setState({ product: product, barcode: barcode });
                }
              }
              this.setState({ barcode: barcode });
            }
          }}
        >
          <BarcodeMask />
          <View
            style={{
              borderWidth: 1,
              borderColor: colors.borderColor,
              marginBottom: 10,
              padding: 10,
              borderRadius: 10,
              width: "95%",
            }}
          >
            {this.state.product ? (
              <View>
                <Text style={[styles.text, { marginBottom: 10, fontSize: 14 }]}>
                  {this.state.product.NAME}
                </Text>
                <TouchableOpacity
                  style={[
                    styles.primaryButton,
                    { marginBottom: 0, padding: 5 },
                  ]}
                  onPress={() => {
                    this.props.navigation.navigate("CheckDetail");
                  }}
                >
                  <Text style={styles.primaryButtonText}>Ekle</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <Text style={{ color: "#ffffff" }}>Barkodu okutunuz...</Text>
            )}
          </View>
        </RNCamera>
      </BackImage>
    );
  }
}
const style = StyleSheet.create({
  button: {
    flex: 1,
    borderColor: colors.borderColor,
    backgroundColor: colors.borderColor,
    borderRadius: 25,
    flexDirection: "row",
    borderWidth: 4,
    margin: 10,
    width: width / 3 - 20,
    height: width / 3 - 20,
    alignSelf: "center",
    alignItems: "center",
    alignContent: "center",
  },
  buttonText: {
    flex: 1,

    fontSize: 26,
    fontWeight: "bold",
    color: colors.textColor,
    textAlignVertical: "center",
    textAlign: "center",
  },
});

export const BarcodeScreen = connect(
  (state: ApplicationState) => state,
  (dispatch) => {
    return {
      DepartmentActions: bindActionCreators({ ...DepartmentActions }, dispatch),
    };
  }
)(BarcodeScreenComp);
