import {LitElement, html, css} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';
import './components/widget-block.js';
import './components/blog-block.js';
import './components/widget-container.js';
import './components/ad-widget.js';
import './components/login-widget.js';
import './components/task-manager.js';
import './components/bmi-widget.js';
import './components/task-summary-widget.js';
import './components/mood-widget.js';
import './components/create-task.js';
import './components/task-timer.js';

/**
 * Comp2110TaskManager component constructs the main UI of the application
 */
class Comp2110TaskManager extends LitElement {
  static properties = {
    header: {type: String},
  };

  static styles = css`
    :host {
      min-height: 100vh;   
      font-size: 14pt;
      max-width: 100%;
      margin: 0 auto;
      text-align: center;
      background-color: blue;
      font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
    }

    main {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center-top; 
      background-image: linear-gradient(#1f2833, black); 
     padding: 20px;
    }

    task-manager,
widget-container {
  flex: auto; 
}

header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  
  font-size: 15px;
  padding: 10px 20px;
  padding-bottom: 1px;
  padding-top: 2px;
}

.header-content {
  display: flex;
  align-items: center;
}
  

    h1 {
      color: #1f2833;
    }

    .login-widget {
      color: #1f2833;
      margin-left:50px;
    }

    create-task{
      text-align: center;
      margin-top: 10px;
      margin-right: 20px;
    }

    .app-footer {
      font-size: calc(12px + 0.5vmin);
      align-items: center;
      
    }

    .app-footer a {
      margin-left: 5px;
    }
  `;

  constructor() {
    super();
    this.header = 'COMP2110 Group 3 Task Manager';
  }

  render() {
    return html`
    <header>
    <div class="header-content">
      <h1>${this.header}</h1>
      <login-widget style="color: #1f2833; margin-left: 680px;"></login-widget>
    </div>
   
  </header>
  
 
  
      <main>    
      <create-task></create-task> 
      <task-manager></task-manager>  
        
        <widget-container>
          <ad-widget></ad-widget>
          <task-summary-widget header="Task Summary"></task-summary-widget>
          <mood-widget header="Mood Widget"></mood-widget>
          <task-timer header="Task Timer"></task-timer>
        </widget-container>
  
      </main>

      <p class="app-footer">
        🚽 Made with love by
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/open-wc"
          >open-wc</a
        >.
      </p>
    `;
  }
}

customElements.define('comp2110-task-manager', Comp2110TaskManager);
