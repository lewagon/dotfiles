import { Application } from "@hotwired/stimulus";
window.Stimulus = Application.start();

import GiftsController from "./controllers/gifts_controller.js";
Stimulus.register("gifts", GiftsController);

