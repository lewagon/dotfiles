import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["button", "menu"]
  connect() {
    console.log("dropdown controller connected");
  }
  trigger(event) {
    console.log("dropdown toggled");
    // this.menuTarget.classList.toggle("display");
    this.menuTarget.classList.toggle("navbar-search");
  }
}
