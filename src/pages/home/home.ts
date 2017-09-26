import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';

import { BackgroundMode } from '@ionic-native/background-mode';
import { NativeAudio } from '@ionic-native/native-audio';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    isPlaying = false;

    constructor(
        private _nativeAudio: NativeAudio,
        private _backgroundMode: BackgroundMode,
        private _platform: Platform,
        public navCtrl: NavController,
    ) {
        this._platform.ready().then(
            (valuePlatformReady: any) => {
                this._backgroundMode.disable().catch(
                    reason => {
                        let message = 'this._backgroundMode.disable() FAILED because \'' + JSON.stringify(reason) + "'";
                        alert(message);
                    }
                );
            }
        )
            .catch(
            reason => {
                let message = "this._platform.ready() FAILED because '" + JSON.stringify(reason) + "'";
                alert(message);
            }
            );
    }

    play(event: MouseEvent) {
        if (this.isPlaying) { return; }
        this._platform.ready().then(
            (valuePlatformReady: any) => {
                this._nativeAudio.preloadComplex("sound", "13sec_sound.mp3", 1, 1, 0)
                    .then(
                    value => {
                        let message = 'this._nativeAudio.preloadComplex("sound", "13sec_sound.mp3", 1, 1, 0) OK and returned \'' + JSON.stringify(value) + "'";
                        console.log(message);
                        this._nativeAudio.loop("sound")
                            .then(
                            value => {
                                let message = 'this._nativeAudio.loop("sound") OK and returned \'' + JSON.stringify(value) + "'";
                                console.log(message);
                               this.isPlaying = true;
                            }
                            )
                            .catch(
                            reason => {
                                let message = 'this._nativeAudio.loop("sound") FAILED because \'' + JSON.stringify(reason) + "'";
                                alert(message);
                            }
                            );
                    }
                    )
                    .catch(
                    reason => {
                        let message = 'this._nativeAudio.preloadComplex("sound", "13sec_sound.mp3", 1, 1, 0) FAILED because \'' + JSON.stringify(reason) + "'";
                        alert(message);
                    }
                    );
            }
        )
            .catch(
            reason => {
                let message = "this._platform.ready() FAILED because '" + JSON.stringify(reason) + "'";
                alert(message);
            }
            );
    }

    stop(event: MouseEvent) {
        if (!this.isPlaying) { return; }
        this._platform.ready().then(
            (valuePlatformReady: any) => {
                //this._backgroundMode.enable();
                this._nativeAudio.stop("sound")
                    .then(
                    value => {
                        let message = 'this._nativeAudio.stop("sound") OK and returned \'' + JSON.stringify(value) + "'";
                        console.log(message);
                        this.isPlaying = false;
                        this._nativeAudio.unload("sound")
                            .then(
                            value => {
                                let message = 'this._nativeAudio.unload("sound") OK and returned \'' + JSON.stringify(value) + "'";
                                console.log(message);
                            }
                            )
                            .catch(
                            reason => {
                                let message = 'this._nativeAudio.unload("sound") FAILED because \'' + JSON.stringify(reason) + "'";
                                alert(message);
                            }
                            );
                    }
                    )
                    .catch(
                    reason => {
                        let message = 'this._nativeAudio.stop("sound") FAILED because \'' + JSON.stringify(reason) + "'";
                        alert(message);
                    }
                    );
            }
        )
            .catch(
            reason => {
                let message = "this._platform.ready() FAILED because '" + JSON.stringify(reason) + "'";
                alert(message);
            }
            );
    }

    enableBackgroundMode(event: MouseEvent) {
        this._platform.ready().then(
            (valuePlatformReady: any) => {
                this._backgroundMode.enable();
            }
        );
    }

    disableBackgroundMode(event: MouseEvent) {
        this._platform.ready().then(
            (valuePlatformReady: any) => {
                this._backgroundMode.disable()
                    .then(
                    value => {
                        let message = "this._backgroundMode.disable() OK and returned '" + JSON.stringify(value) + "'";
                        alert(message);
                    }
                    )
                    .catch(
                    reason => {
                        let message = "this._backgroundMode.disable() FAILED because '" + JSON.stringify(reason) + "'";
                        alert(message);
                    }
                    );
            }
        )
            .catch(
            reason => {
                let message = "this._platform.ready() FAILED because '" + JSON.stringify(reason) + "'";
                alert(message);
            }
            );
    }
}
