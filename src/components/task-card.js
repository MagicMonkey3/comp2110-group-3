import {LitElement, html, css} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';
import {TaskModel} from '../models.js';
import './edit-task.js';
import './delete-task.js';

/**
 * TaskCard <task-card id=N>
 * Display the details of the task with id N in a 'card'
 * as part of the task board
 */
class TaskCard extends LitElement {
  static properties = {
    id: 0,
    _task: {state: true},
  };

  static styles = css`
    :host {
        display: block;
        width: 200px;
        background-color: #1f2833;
        color: white;
    padding-bottom: 10px;
    border-radius: 5px;
    }
    :host input {
        width: 5em;
    }
    h2 {
      background-color: #66fcf1;
      color: #1f2833;
      font-size: large;
      font-variant: small-caps;
      border-top-left-radius: 5px;
      border-top-right-radius: 5px;
    }

    button {
      font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
      padding: 0.5rem;
    border: 1px solid blue;
    border-radius: 6px;
    cursor: pointer;
    color: white;
    background-color: #ee05ee;
    }

    button:hover{
      color: #ee05ee;
      background-color: white;
    }
  `;

  connectedCallback() {
    super.connectedCallback();
    this._loadData();
    // set up an event listener to load new tasks when they change
    window.addEventListener('tasks', () => {
      this._loadData();
    });
  }

  _loadData() {
    this._task = TaskModel.getTask(this.id);
  }

  render() {
    if (this._task) {
      const ts = new Date(parseInt(this._task.timestamp));
      const due = new Date(parseInt(this._task.due));
      return html`
      <div>
        <h2>${this._task.summary}</h2>
        <p class='task-timestamp'>Created: ${ts.toDateString()}</p>
        <p class='task-due'>Due: ${due.toDateString()}</p>
        <p class='task-content'>${this._task.text}</p>
        <p class='task-priority'>Priority: ${this._task.priority}</p>

        <edit-task id=${this.id}></edit-task>
        <delete-task id=${this.id}></delete-task>
      </div>
      `;
    } else {
      return html`<div>Loading...</div>`;
    }
  }
}
customElements.define('task-card', TaskCard);
