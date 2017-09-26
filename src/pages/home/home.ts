import { Component, OnInit } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';

import { BackgroundMode, BackgroundModeConfiguration } from '@ionic-native/background-mode';
import { NativeAudio } from '@ionic-native/native-audio';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage implements OnInit {

    isPlaying = false;

    constructor(
        private _nativeAudio: NativeAudio,
        private _backgroundMode: BackgroundMode,
        private _platform: Platform,
        public navCtrl: NavController,
    ) {
    }

    ngOnInit() {
        this._platform.ready().then(
            (valuePlatformReady: any) => {
                let cfg: BackgroundModeConfiguration = {
                    /**
                     * Title of the background task
                     */
                    title: "Background Audio",
                    /**
                     * Description of background task
                     */
                    text: "in the background",
                    /**
                     * This will look for `<icon name>.png` in platforms/android/res/drawable|mipmap
                     */
                    icon: 'icon',
                    color: 'FF0000',
                    /**
                     * By default the app will come to foreground when taping on the notification. If false, plugin won't come to foreground when tapped.
                     */
                    resume: true,
                    hidden: false,
                    bigText: true,
                    /**
                     * The text that scrolls itself on statusbar
                     */
                    ticker: "ticker in the background",
                    /**
                     * if true plugin will not display a notification. Default is false.
                     */
                    silent: false
                };
                this._backgroundMode.setDefaults(cfg)
                    .then(
                    value => {
                        let message = 'this._backgroundMode.setDefaults(cfg) OK and returned \'' + JSON.stringify(value) + "'";
                        alert(message);
                        console.log(message);
                    }
                    )
                    .catch(
                    reason => {
                        let message = "this._backgroundMode.setDefaults(cfg) FAILED because '" + JSON.stringify(reason) + "'";
                        alert(message);
                    }
                    );
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
                        if ("A reference already exists for the specified audio id." === reason) {
                            return Promise.resolve("ok - title is already preloaded");
                        }
                        else {
                            let message = 'this._nativeAudio.preloadComplex("sound", "13sec_sound.mp3", 1, 1, 0) FAILED because \'' + JSON.stringify(reason) + "'";
                            alert(message);
                        }
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
                                console.log(message);
                                alert(message);
                            }
                            );
                    }
                    )
                    .catch(
                    reason => {
                        let message = 'this._nativeAudio.stop("sound") FAILED because \'' + JSON.stringify(reason) + "'";
                        console.log(message);
                        alert(message);
                    }
                    );
            }
        )
            .catch(
            reason => {
                let message = "this._platform.ready() FAILED because '" + JSON.stringify(reason) + "'";
                console.log(message);
                alert(message);
            }
            );
    }

    enableBackgroundMode(event: MouseEvent) {
        console.log("  > enableBackgroundMode()");
        this._platform.ready().then(
            (valuePlatformReady: any) => {
                this._backgroundMode.enable();
            }
        );
    }

    disableBackgroundMode(event: MouseEvent) {
        console.log("  > disableBackgroundMode()");
        this._platform.ready().then(
            (valuePlatformReady: any) => {
                console.log(" -  disableBackgroundMode()..._platform.ready()");
                console.log(JSON.stringify(this._backgroundMode.disable()));
                this._backgroundMode.disable()
                    .then(
                    value => {
                        let message = "this._backgroundMode.disable() OK and returned '" + JSON.stringify(value) + "'";
                        console.log(message);
                        alert(message);
                    }
                    )
                    .catch(
                    reason => {
                        let message = "this._backgroundMode.disable() FAILED because '" + JSON.stringify(reason) + "'";
                        console.log(message);
                        alert(message);
                    }
                    );
            }
        )
            .catch(
            reason => {
                let message = "this._platform.ready() FAILED because '" + JSON.stringify(reason) + "'";
                console.log(message);
                alert(message);
            }
            );
    }
}
