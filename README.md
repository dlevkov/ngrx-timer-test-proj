# NgrxTimers

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.3.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Wireframe

---

### State

```json
{
tasks: Entity {
  id: Number,
  taskName: string,
  elapsedSeconds: Number
},
activeTaskId: Number
}
```

---

### Actions

```js
add new task: { taskName, id }
playTask: { taskId }
pauseTask: { taskId }
setTaskElapsedSeconds: { taskId, elapsedSeconds }
```

---

### Effect

When activeTaskId has value - start timer and every second fires incrementTask action

---

### Selectors

totalTime
