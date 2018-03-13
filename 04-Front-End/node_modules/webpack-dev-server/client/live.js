var $ = require("jquery");
var stripAnsi = require("strip-ansi");
var socket = require("./socket");
require("./style.css");

var hot = false;
var currentHash = "";

$(function() {
	$("body").html(require("./page.pug")());
	var status = $("#status");
	var okness = $("#okness");
	var $errors = $("#errors");
	var iframe = $("#iframe");
	var header = $(".header");

	var contentPage = window.location.pathname.substr("/webpack-dev-server".length) + window.location.search;

	status.text("Connecting to sockjs server...");
	$errors.hide();
	iframe.hide();
	header.css({
		borderColor: "#96b5b4"
	});

	var onSocketMsg = {
		hot: function() {
			hot = true;
			iframe.attr("src", contentPage + window.location.hash);
		},
		invalid: function() {
			okness.text("");
			status.text("App updated. Recompiling...");
			header.css({
				borderColor: "#96b5b4"
			});
			$errors.hide();
			if(!hot) iframe.hide();
		},
		hash: function(hash) {
			currentHash = hash;
		},
		"still-ok": function() {
			okness.text("");
			status.text("App ready.");
			header.css({
				borderColor: ""
			});
			$errors.hide();
			if(!hot) iframe.show();
		},
		ok: function() {
			okness.text("");
			$errors.hide();
			reloadApp();
		},
		warnings: function() {
			okness.text("Warnings while compiling.");
			$errors.hide();
			reloadApp();
		},
		errors: function(errors) {
			status.text("App updated with errors. No reload!");
			okness.text("Errors while compiling.");
			$errors.text("\n" + stripAnsi(errors.join("\n\n\n")) + "\n\n");
			header.css({
				borderColor: "#ebcb8b"
			});
			$errors.show();
			iframe.hide();
		},
		close: function() {
			status.text("");
			okness.text("Disconnected.");
			$errors.text("\n\n\n  Lost connection to webpack-dev-server.\n  Please restart the server to reestablish connection...\n\n\n\n");
			header.css({
				borderColor: "#ebcb8b"
			});
			$errors.show();
			iframe.hide();
		}
	};

	socket("/sockjs-node", onSocketMsg);

	iframe.load(function() {
		status.text("App ready.");
		header.css({
			borderColor: ""
		});
		iframe.show();
	});

	function reloadApp() {
		if(hot) {
			status.text("App hot update.");
			try {
				iframe[0].contentWindow.postMessage("webpackHotUpdate" + currentHash, "*");
			} catch(e) {
				console.warn(e);
			}
			iframe.show();
		} else {
			status.text("App updated. Reloading app...");
			header.css({
				borderColor: "#96b5b4"
			});
			try {
				var old = iframe[0].contentWindow.location + "";
				if(old.indexOf("about") == 0) old = null;
				iframe.attr("src", old || (contentPage + window.location.hash));
				old && iframe[0].contentWindow.location.reload();
			} catch(e) {
				iframe.attr("src", contentPage + window.location.hash);
			}
		}
	}

});
