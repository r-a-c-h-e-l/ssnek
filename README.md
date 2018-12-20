## Welcome to Ssnek :snake:
___

### Running the app

```
cd root
node server.js
```
Visit `localhost:3000` in your browser to see this slinky dude in action.

This app does have a small server so that the browser may load ECMAScript modules!

The module scripts and their imports are fetched with CORS, serving them from the filesystem caused CORS errors. A small server is used to serve the modules and avoid this issue.

Loading modules via a script tag, defers by default, thus not blocking the HTML parser from fetching. This is not a big deal here as the extent of the document is pretty much this script tag, but it was a fun opportunity to try loading modules via a script tag!

### TODOs

This was a little too much fun to stop at 3 hours. However, I skipped refactors with the knowledge that I would cite them as next steps.

A few next steps:
1. I would like to refactor the way points are drawn in the canvas space, by mapping them to a grid of rows and columns, so that each point correlates to an intersection of the grid. In this way, the snake and food would always be aligned on a grid and the point comparisons for willCrash, willEat would become immensely easier, i.e. p.x === f.x && p.y === f.y. In general, I am wondering if working from points is better than working from a Board state. A mapping of the board to a grid would help towards this transition.
2. I intentionally separated the board, snake, and food with the thought that they could evolve into interfaces, which expose some critical engine methods for a game to utilize.
3. I made the snake loop, however it only loops in the positive. I would work to make that work in the negative as well.
4. Also, I am not filtering out moves which are the opposite of the current direction. Thus, the game crashes when you are moving east and immediately go west. Frankly, I think the burden is on the user in this case! But I would like to make it more user friendly and trash those directions when input.
4. Would love to try to make some different games with snake, food, an board interfaces!
5. I had fun :)
