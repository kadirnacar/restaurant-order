import { BackImage, LoaderSpinner } from '@components';
import { NavigationProp } from '@react-navigation/native';
import { DepartmentActions } from '@reducers';
import { ApplicationState } from '@store';
import { colors, hexToRgb } from '@tools';
import ColorScheme from 'color-scheme';
import React, { Component } from 'react';
import { FlatList, StyleSheet, Text } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

interface DepartmentScreenState {
}

interface DepartmentProps {
    DepartmentActions: typeof DepartmentActions;
    navigation: NavigationProp<any>;
}

type Props = DepartmentProps & ApplicationState;

export class DepartmentScreenComp extends Component<Props, DepartmentScreenState> {
    constructor(props) {
        super(props);
        this.scheme = new ColorScheme();
        this.scheme.from_hue(10)
            .scheme('analogic')
            .variation('hard');
        this.colors = this.scheme.colors();
    }
    scheme: ColorScheme;
    colors: any;

    async componentDidMount() {
        await this.props.DepartmentActions.setCurrent(null);
    }
    render() {
        return (
            <BackImage>
                <LoaderSpinner showLoader={this.props.Department.isRequest} />
                <FlatList
                    data={this.props.Department.items}
                    style={{ flex: 1 }}
                    renderItem={({ item, index }) => {
                        const color = hexToRgb(this.colors[index]);
                        return (
                            <TouchableHighlight underlayColor="#ffffff00" key={index}
                                style={[style.button, { backgroundColor: `rgba(${color.r},${color.g},${color.b},0.3)` }]}
                                onPressIn={async () => {
                                    console.log(item)
                                    this.props.DepartmentActions.setCurrent(item);
                                }}>

                                <Text style={style.buttonText}>{item.DEPARTMENTNAME}</Text>
                            </TouchableHighlight>
                        )
                    }}
                    numColumns={1}
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
        borderWidth: 4,
        margin: 5,
        padding: 10,
        borderRadius: 25,
    },
    buttonText: {
        flex: 1,
        fontSize: 18,
        fontWeight: "bold",
        color: colors.textColor,
        textAlignVertical: "center",
        textAlign: "center"
    }
});

export const DepartmentScreen = connect(
    (state: ApplicationState) => state,
    dispatch => {
        return {
            DepartmentActions: bindActionCreators({ ...DepartmentActions }, dispatch)
        };
    }
)(DepartmentScreenComp);