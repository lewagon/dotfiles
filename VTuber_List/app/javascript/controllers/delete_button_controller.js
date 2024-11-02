import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["button", "link"]
  connect() {

  }
  trigger(event) {
    this.buttonTargets.forEach(button => {
      if (button.classList.contains("d-none")){
      button.classList.remove("d-none");
      } else {
        button.classList.add("d-none");
      }
    });

    this.linkTargets.forEach(link => {
      if (!link.classList.contains("d-none")) {
        link.classList.add("d-none");
      } else {
        link.classList.remove("d-none");
      }
    });
  }
}
