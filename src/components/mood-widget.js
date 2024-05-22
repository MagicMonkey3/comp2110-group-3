import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';

class MoodWidget extends LitElement {
  static properties = {
    header: { type: String },
    backgroundColor: { type: String }, // New property to store background color
    counter: { type: Number } // Property to hold the counter value
  };

  static styles = css`
    :host {
      display: block;
      width: 250px;
      height: 250px;
      border: 1px solid black;
      color: white;
      background-image: var(--widget-background-gradient); /* Use CSS variable for background gradient */
    }

    .counter-display {
      font-size: 24px;
    }

    button {
      font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
      padding: 0.5rem;
      border-color: #66fcf1;
    border-radius: 6px;
    cursor: pointer;
    color: #1f2833;
    background-color: #66fcf1;
    }

    button:hover{
      color: #66fcf1;
      background-color: #1f2833;
    }

    .counter-buttons button {
      margin: 5px;
    }
  `;

  constructor() {
    super();
    this.header = 'Widget';
    this.backgroundColor = ''; // Initialize background color
    this.counter = 0; // Initialize counter value
  }

  connectedCallback() {
    super.connectedCallback();
    this.calculateBackgroundColor();
  }

  calculateBackgroundColor() {
    const now = new Date();
    const hour = now.getHours();

    let gradientColor1, gradientColor2;

    // Set gradient colors based on the time of day
    if (hour >= 6 && hour < 12) {
      gradientColor1 = 'lightblue'; // Morning
      gradientColor2 = 'blue';
    } else if (hour >= 12 && hour < 18) {
      gradientColor1 = 'orange'; // Afternoon
      gradientColor2 = 'red';
    } else {
      gradientColor1 = 'purple'; // Evening/Night
      gradientColor2 = 'darkblue';
    }

    // Update background gradient using CSS variable
    this.style.setProperty(
      '--widget-background-gradient',
      `linear-gradient(45deg, ${gradientColor1}, ${gradientColor2})`
    );
  }

  // Function to handle incrementing the counter value
  incrementCounter() {
    this.counter++;
    this.requestUpdate(); // Trigger LitElement to re-render
  }

  // Function to handle decrementing the counter value
  decrementCounter() {
    if (this.counter > 0) {
      this.counter--;
      this.requestUpdate(); // Trigger LitElement to re-render
    }
  }

  render() {
    return html`
      <h3>${this.header}</h3>
      <p>Tasks Left</p>
      <div class="counter-container">
        <h1 class="counter-display">${this.counter}</h1>
        <div class="counter-buttons">
          <button @click=${this.decrementCounter}>-</button>
          <button @click=${this.incrementCounter}>+</button>
        </div>
      </div>
      ${this.counter === 0 
        ? html`<p>Congratulations!</p>` 
        : html``}
    `;
  }
}

customElements.define('mood-widget', MoodWidget);