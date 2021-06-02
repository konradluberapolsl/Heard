import * as React from 'react';
import { FAB, Portal, Provider } from 'react-native-paper';
import {theme} from "../theme/Theme";

const  FloatingActionButton = ({onApiAddPress, onOwnAddPress}) => {

    const [state, setState] = React.useState({ open: false });

    const onStateChange = ({ open }) => setState({ open });

    const { open } = state;

    return (
                <FAB.Group
                    open={open}
                    icon={open ? 'book-music' : 'plus'}
                    actions={[
                        {
                            icon: 'note-plus-outline',
                            label: 'Add your own',
                            onPress: onOwnAddPress,
                            small: false,
                        },
                        {
                            icon: 'playlist-plus',
                            label: 'Add from list',
                            onPress: onApiAddPress,
                            small: false,
                        },
                    ]}
                    onStateChange={onStateChange}
                    onPress={() => {
                        if (open) {
                            // do something if the speed dial is open
                        }
                    }}
                />

    );
};

export default FloatingActionButton;

