import {Modal} from "react-native";
import {WebView} from "react-native-webview";
import React from "react";

export default function findModal ({isWebViewModal, setIsWebViewModal, url}) {
    console.log(isWebViewModal,url);
    const onNavigationStateChange = navState => {
        if (navState.url.indexOf('https://www.google.com') === 0) {
            const regex = /#access_token=(.+)/;
            let accessToken = navState.url.match(regex)[1];
            console.log(accessToken);
        }
    };
    return (
        <Modal
            animationType="fade"
            transparent={false}
            visible={isWebViewModal}
            onRequestClose={() => setIsWebViewModal()}
            style = {{ height: 350, width: 300 }}>
            <WebView
                source = {{ uri: url}}
                onNavigationStateChange={this.onNavigationStateChange}
                startInLoadingState
                scalesPageToFit
                javaScriptEnabled
                style={{ flex: 1, marginTop: 30 }}
            />
        </Modal>
    )
}
