import { NavigationProp } from '@react-navigation/native';
import { UserActions } from '@reducers';
import { ApplicationState } from '@store';
import React, { Component } from 'react';
import { Dimensions, Text, View, ImageBackground, StyleSheet, KeyboardAvoidingView, Alert } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { BackImage, LoaderSpinner } from '@components';
import { colors, styles } from '@tools';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
const { width } = Dimensions.get('window');

interface LoginState {
    username: string;
    password: string;
    tenant: string;
    isRequest?: boolean;
}

interface LoginProps {
    UserActions: typeof UserActions;
    navigation: NavigationProp<any>;
}

type Props = LoginProps & ApplicationState;


export class LoginScreenComp extends Component<Props, LoginState> {
    constructor(props) {
        super(props);
        this.state = {
            username: "demo",
            password: "123",
            tenant: "18892"
        }
        this.handleLogin = this.handleLogin.bind(this);
    }
    async componentDidMount() {
        await this.props.UserActions.clear();
    }
    async handleLogin() {
        const result = await this.props.UserActions.getItem(this.state.username, this.state.password, this.state.tenant);
        if (!result) {
            Alert.alert("Giriş Başarısız. Lütfen bilgilerinizi kontrol ediniz.")
        } else {
            this.props.navigation.navigate("Home");
        }
    }
    render() {
        return (
            <BackImage>
                <LoaderSpinner showLoader={this.props.User.isRequest} />
                <View style={{ flex: 1, justifyContent: "center" }}>
                    <KeyboardAvoidingView behavior="padding" style={style.container}>
                        <Text
                            style={[styles.text, {
                                padding: 5,
                                marginBottom: 10,
                                textAlign: "center"
                            }]}>Kuruluşunuza ait ElektraWeb POS kullanıcı bilgileriniz ile giriş yapınız.</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Tenant"
                            value={this.state.tenant}
                            onChangeText={(text) => this.setState({ tenant: text })} />
                        <TextInput
                            style={styles.input}
                            placeholder="Kullanıcı Kodu"
                            value={this.state.username}
                            onChangeText={(text) => this.setState({ username: text })} />
                        <TextInput
                            style={styles.input}
                            secureTextEntry={true}
                            placeholder="Şifre"
                            value={this.state.password}
                            onChangeText={(text) => this.setState({ password: text })} />
                        <TouchableOpacity style={styles.primaryButton} onPress={this.handleLogin}>
                            <Text style={styles.primaryButtonText}>Giriş</Text>
                        </TouchableOpacity>
                    </KeyboardAvoidingView>
                </View>
            </BackImage>
        )
    }
}

const style = StyleSheet.create({
    container: {
        marginHorizontal: 20,
        backgroundColor: colors.color1,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 20,
    }
});

export const LoginScreen = connect(
    (state: ApplicationState) => state,
    dispatch => {
        return {
            UserActions: bindActionCreators({ ...UserActions }, dispatch)
        };
    }
)(LoginScreenComp);

