import { Controller } from "@hotwired/stimulus"
import { useTransition } from "stimulus-use"

export default class Dropdown extends Controller {
  menuTarget: HTMLElement
  toggleTransition: (event?: Event) => void
  leave: (event?: Event) => void
  transitioned: false

  static targets = ["menu"]

  connect(): void {
    useTransition(this, {
      element: this.menuTarget,
    })
  }

  toggle(): void {
    this.toggleTransition()
  }

  hide(event: Event): void {
    // @ts-ignore
    if (!this.element.contains(event.target) && !this.menuTarget.classList.contains("hidden")) {
      this.leave()
    }
  }
}
