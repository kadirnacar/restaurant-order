import { BackImage, LoaderSpinner } from '@components';
import { NavigationProp } from '@react-navigation/native';
import { DepartmentActions } from '@reducers';
import { ApplicationState } from '@store';
import { colors, hexToRgb } from '@tools';
import ColorScheme from 'color-scheme';
import React, { Component } from 'react';
import { FlatList, StyleSheet, Text, Dimensions } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
const { width } = Dimensions.get("window");
interface TablesScreenState {
    tables?: number[];
}

interface TablesProps {
    DepartmentActions: typeof DepartmentActions;
    navigation: NavigationProp<any>;
}

type Props = TablesProps & ApplicationState;

export class TablesScreenComp extends Component<Props, TablesScreenState> {
    constructor(props) {
        super(props);
        this.scheme = new ColorScheme();
        this.scheme
            .scheme('analogic')
            .variation('hard');
        this.colors = this.scheme.colors();
        this.state = { tables: [] };
    }
    scheme: ColorScheme;
    colors: any;

    async componentDidMount() {
        const userDeps = this.props.Department.current && this.props.Department.current.Tables ? Object.keys(this.props.Department.current.Tables).map(id => parseInt(id)) : [];
        this.setState({ tables: userDeps });
    }
    render() {
        return (
            <BackImage>
                <LoaderSpinner showLoader={this.props.Department.isRequest} />
                <FlatList
                    style={{ flex: 1 }}
                    data={this.state.tables}
                    renderItem={({ item, index }) => {
                        const color = hexToRgb(this.colors[index % 12]);
                        const dep = this.props.Department.current.Tables[item];
                        return (
                            <TouchableHighlight underlayColor="#ffffff00" key={index}
                                style={[style.button, { backgroundColor: `rgba(${color.r},${color.g},${color.b},0.3)` }]}
                                onPress={async () => {
                                }}>

                                <Text style={style.buttonText}>{dep.TABLENO}</Text>
                            </TouchableHighlight>
                        )
                    }}
                    numColumns={3}
                    keyExtractor={(item, index) => index.toString()}
                />
            </BackImage>

        )
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
        width: (width / 3) - 20,
        height: (width / 3) - 20,
        alignSelf: "center",
        alignItems: "center",
        alignContent: "center"
    },
    buttonText: {
        flex: 1,

        fontSize: 26,
        fontWeight: "bold",
        color: colors.textColor,
        textAlignVertical: "center",
        textAlign: "center",
    }
});

export const TablesScreen = connect(
    (state: ApplicationState) => state,
    dispatch => {
        return {
            DepartmentActions: bindActionCreators({ ...DepartmentActions }, dispatch)
        };
    }
)(TablesScreenComp);