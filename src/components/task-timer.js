import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';
import { TaskModel } from '../models.js';

class TaskTimer extends LitElement {
  static properties = {
    header: { type: String },
    countdownValue: { type: Number },
    countdownInterval: { type: Number },
    countdownRunning: { type: Boolean },
  };

  static styles = css`
    div {
      display: flex;
      flex-direction: column;
    }

    input {
      margin-bottom: 10px;
    }

    button {
      margin-top: 10px;
    }
  `;

  constructor() {
    super();
    this.header = 'Task Timer';
    this.countdownValue = 0;
    this.countdownInterval = null;
    this.countdownRunning = false;
  }

  startCountdown() {
    if (this.countdownValue > 0 && !this.countdownRunning) {
      this.countdownInterval = setInterval(() => {
        if (this.countdownValue <= 0) {
          clearInterval(this.countdownInterval);
          this.countdownRunning = false;
        } else {
          this.countdownValue -= 1;
          this.requestUpdate();
        }
      }, 1000); // Timer tick is now 1 second
      this.countdownRunning = true;
    }
  }

  stopCountdown() {
    clearInterval(this.countdownInterval);
    this.countdownRunning = false;
  }

  formatTime() {
    const hours = Math.floor(this.countdownValue / 60 / 60);
    const minutes = Math.floor((this.countdownValue % 3600) / 60);
    const seconds = this.countdownValue % 60;
    return `${hours > 0 ? hours + ' hours ' : ''}${minutes} minutes ${seconds} seconds`;
  }

  render() {
    return html`
      <div>
        <h2>${this.header}</h2>
        <input type="number" .value=${this.countdownValue} @input=${(e) => this.countdownValue = parseInt(e.target.value)} placeholder="Enter countdown value in minutes">
        <button @click=${this.startCountdown} ?disabled=${this.countdownRunning}>Start</button>
        <button @click=${this.stopCountdown} ?disabled=${!this.countdownRunning}>Stop</button>
        <p>${this.countdownValue > 0 ? `Time Remaining: ${this.formatTime()}` : 'Countdown finished!'}</p>
      </div>
    `;
  }
}

customElements.define('task-timer', TaskTimer);

