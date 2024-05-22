// task summary
import {LitElement, html, css} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';
import {TaskModel} from '../models.js';

class TaskSummary extends LitElement {
  static properties = {
    header: {type: String},
    toDo: {type: Number},
    doing: {type: Number},
    done: {type: Number},
    // _tasks: {type: Object}

  };

  static styles = css`
    :host {
        display: block;
        width: 250px;
        height: 250px;
        background-color: #1f2833;
        color: white;
    padding-bottom: 10px;
    border-radius: 5px;
    }
  `;

  constructor() {
    super();
    this.header = 'Widget';
  
    this.toDo = 0;
    this.doing = 0;
    this.done = 0;

    TaskModel.loadData();
    
  }

  connectedCallback() {
    super.connectedCallback();
    this._loadData();
  }



_loadData() {
  this.toDo = TaskModel.getTasks("ToDo").length;
  this.doing = TaskModel.getTasks("Doing").length;
  this.done = TaskModel.getTasks("Done").length;
}

render() {
  return html`
    <h3>${this.header}</h3>
    <p>ToDo: ${this.toDo}</p>
    <p>Doing: ${this.doing} </p>
    <p>Done: ${this.done} </p>
  `;
}
}

customElements.define('task-summary-widget', TaskSummary);
