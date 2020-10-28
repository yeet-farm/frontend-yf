// Frank Poth 02/28/2018

/* This is a fixed time step game loop. It can be used for any game and will ensure
that game state is updated at the same rate across different devices which is important
for uniform gameplay. Imagine playing your favorite game on a new phone and suddenly
it's running at a different speed. That would be a bad user experience, so we fix
it with a fixed step game loop. In addition, you can do things like frame dropping
and interpolation with a fixed step loop, which allow your game to play and look
smooth on slower devices rather than freezing or lagging to the point of unplayability. */

const Engine = function (timeStep, update, render) {
  this.accumulated_time = 0 // Amount of time that's accumulated since the last update.
  this.animationFrameRequest = undefined // reference to the AFR
  this.time = undefined // The most recent timestamp of loop execution.
  this.timeStep = timeStep // 1000/30 = 30 frames per second

  this.updated = false // Whether or not the update function has been called since the last cycle.

  this.update = update // The update function
  this.render = render // The render function

  this.run = function(timeStamp) { // This is one cycle of the game loop
    this.accumulated_time += timeStamp - this.time
    this.time = timeStamp

    /* If the device is too slow, updates may take longer than our time step. If
    this is the case, it could freeze the game and overload the cpu. To prevent this,
    we catch a memory spiral early and never allow three full frames to pass without
    an update. This is not ideal, but at least the user won't crash their cpu. */
    if (this.accumulated_time >= this.timeStep * 3) {
      this.accumulated_time = this.timeStep
    }

    /* Since we can only update when the screen is ready to draw and requestAnimationFrame
    calls the run function, we need to keep track of how much time has passed. We
    store that accumulated time and test to see if enough has passed to justify
    an update. Remember, we want to update every time we have accumulated one time step's
    worth of time, and if multiple time steps have accumulated, we must update one
    time for each of them to stay up to speed. */
    while (this.accumulated_time >= this.timeStep) {
      this.accumulated_time -= this.timeStep;
      this.update(timeStamp)
      this.updated = true // If the game has updated, we need to draw it again.
    }

    /* This allows us to only draw when the game has updated. */
    if (this.updated) {
      this.updated = false
      this.render(timeStamp)
    }
    this.animationFrameRequest = window.requestAnimationFrame(this.handleRun)
  }

  this.handleRun = (timeStep) => { this.run(timeStep) }
}

Engine.prototype = {
  constructor: Engine,
  start: function () {
    this.accumulated_time = this.timeStep;
    this.time = window.performance.now();
    this.animationFrameRequest = window.requestAnimationFrame(this.handleRun)
  },
  stop: function () { window.cancelAnimationFrame(this.animationFrameRequest) }
}
