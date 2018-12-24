import React from 'react';
import { Button, ButtonGroup, Icon, Divider, Menu, MenuItem } from '@blueprintjs/core';

const remote = window.require('electron').remote;

class TitleBar extends React.Component {
    render() {
        const { onClose, onMax, onMin, onSettings } = this.props;

        return (
            <div className='titlebar'>
                <ButtonGroup className='titlebar-window-buttons'>
                    <Button onClick={onSettings} icon={<Icon icon='info-sign' iconSize={ICON_SIZE} />} minimal />                 
                    <Button onClick={onSettings} icon={<Icon icon='settings' iconSize={ICON_SIZE} />} minimal />                 
                    <Divider />
                    <Button onClick={onMin} icon={<Icon icon='minus' iconSize={ICON_SIZE} />} minimal /> 
                    <Button onClick={onMax} icon={<Icon icon='square' iconSize={ICON_SIZE - 4} />} minimal /> 
                    <Button onClick={onClose} icon={<Icon icon='cross' iconSize={ICON_SIZE} />} minimal/>
                </ButtonGroup>
            </div>
        );
    }

    handleMinMaxButton = () => {
        let window = remote.getCurrentWindow();
        if (window.isMaximized()) {
            this.setState({ minMaxIcon: 'maximize' });
        } else {
            this.setState({ minMaxIcon: 'minimize' });
        }
    };
}

const ICON_SIZE = 14;

export default TitleBar;