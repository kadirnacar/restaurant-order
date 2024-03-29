import { BackImage, LoaderSpinner } from "@components";
import { NavigationProp } from "@react-navigation/native";
import {
  DepartmentActions,
  StaffActions,
  StokActions,
  UserActions,
} from "@reducers";
import { ApplicationState } from "@store";
import { colors, styles } from "@tools";
import React, { Component } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

interface LoginState {
  username: string;
  password: string;
  tenant: string;
  isRequest?: boolean;
}

interface LoginProps {
  UserActions: typeof UserActions;
  DepartmentActions: typeof DepartmentActions;
  StaffActions: typeof StaffActions;
  StokActions: typeof StokActions;
  navigation: NavigationProp<any>;
}

type Props = LoginProps & ApplicationState;

export class LoginScreenComp extends Component<Props, LoginState> {
  constructor(props) {
    super(props);
    this.state = {
      username: "demo",
      password: "123",
      tenant: "18892",
      // username: "posdemo",
      // password: "123456a.",
      // tenant: "341"
    };
    this.handleLogin = this.handleLogin.bind(this);
  }
  async componentDidMount() {
    await this.props.UserActions.clear();
  }
  async handleLogin() {
    this.setState({ isRequest: true });
    const result = await this.props.UserActions.getItem(
      this.state.username,
      this.state.password,
      this.state.tenant
    );
    if (!result) {
      Alert.alert(
        "Giriş Başarısız. Lütfen bilgilerinizi kontrol ediniz.",
        null,
        [
          {
            text: "Tamam",
            onPress: () => {
              this.setState({ isRequest: false });
            },
          },
        ]
      );
    } else {
      await this.props.StaffActions.getItem(
        this.props.User.current.Tenancy.GARSONID
      );
      await this.props.DepartmentActions.getItems();
      await this.props.DepartmentActions.getTables();
      await this.props.StokActions.getItems();
      this.props.navigation.navigate("Department");
      this.setState({ isRequest: false });
    }
  }
  render() {
    return (
      <BackImage>
        <LoaderSpinner showLoader={this.state.isRequest} />
        <View style={{ flex: 1, justifyContent: "center" }}>
          <KeyboardAvoidingView behavior="padding" style={style.container}>
            <Text
              style={[
                styles.text,
                {
                  padding: 5,
                  marginBottom: 10,
                  textAlign: "center",
                },
              ]}
            >
              Kuruluşunuza ait ElektraWeb POS kullanıcı bilgileriniz ile giriş
              yapınız.
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Tenant"
              value={this.state.tenant}
              onChangeText={(text) => this.setState({ tenant: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Kullanıcı Kodu"
              value={this.state.username}
              onChangeText={(text) => this.setState({ username: text })}
            />
            <TextInput
              style={styles.input}
              secureTextEntry={true}
              placeholder="Şifre"
              value={this.state.password}
              onChangeText={(text) => this.setState({ password: text })}
            />
            <TouchableOpacity
              style={styles.primaryButton}
              onPress={this.handleLogin}
            >
              <Text style={styles.primaryButtonText}>Giriş</Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </View>
      </BackImage>
    );
  }
}

const style = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    backgroundColor: colors.color1,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
});

export const LoginScreen = connect(
  (state: ApplicationState) => state,
  (dispatch) => {
    return {
      DepartmentActions: bindActionCreators({ ...DepartmentActions }, dispatch),
      UserActions: bindActionCreators({ ...UserActions }, dispatch),
      StaffActions: bindActionCreators({ ...StaffActions }, dispatch),
      StokActions: bindActionCreators({ ...StokActions }, dispatch),
    };
  }
)(LoginScreenComp);
