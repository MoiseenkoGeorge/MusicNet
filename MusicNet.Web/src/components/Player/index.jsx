import React, { Component } from "react";
import YandexAudio from "ya-music";

export default class Player extends Component {
	constructor(props) {
		super(props);
		const audioPlayer = new ya.music.Audio(null, null);
		audioPlayer.initPromise().then(function () {
			console.log("Аудио-плеер готов к работе");
		}, function () {
			console.error("Не удалось инициализировать аудио-плеер");
		});
		audioPlayer.play(this.props.data.url);
	}
	render() {
		return (
			<div class="player">
				<div class="controls">
					<button class="controls__play">Play</button>
				</div>

				<div class="progress">
					<div class="progress__loaded"></div>
					<div class="progress__current"></div>
				</div>

				<div class="volume">
					<div class="volume__bar"></div>
				</div>
			</div>
			);
	}
}