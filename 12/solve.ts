const file = await Deno.readTextFile("./input.txt");

type Cardinals = "N" | "E" | "S" | "W";
type Action = "F" | "R" | "L" | Cardinals;
type State = {
  x: number;
  y: number;
  facing: Cardinals;
};
type StateWithWaypoint = {
  x: number;
  y: number;
  wx: number;
  wy: number;
};

export function firstStar() {
  function rotateBoat(facing: Cardinals, value: number): Cardinals {
    const turnLeft = value < 0;
    let steps = Math.abs(value / 90);
    let result = facing;
    while (steps > 0) {
      steps--;
      if (result === "E") {
        result = turnLeft ? "N" : "S";
      } else if (result === "S") {
        result = turnLeft ? "E" : "W";
      } else if (result === "W") {
        result = turnLeft ? "S" : "N";
      } else {
        result = turnLeft ? "W" : "E";
      }
    }

    return result;
  }

  function move(action: Action, value: number, state: State): State {
    switch (action) {
      case "E":
        return {
          ...state,
          x: state.x + value,
        };
      case "W":
        return {
          ...state,
          x: state.x - value,
        };
      case "N":
        return {
          ...state,
          y: state.y - value,
        };
      case "S":
        return {
          ...state,
          y: state.y + value,
        };
      case "R":
        return {
          ...state,
          facing: rotateBoat(state.facing, value),
        };
      case "L":
        return {
          ...state,
          facing: rotateBoat(state.facing, -value),
        };
      case "F":
        return {
          ...state,
          x: state.facing === "E"
            ? state.x + value
            : state.facing === "W"
            ? state.x - value
            : state.x,
          y: state.facing === "S" ? state.y + value : state.facing === "N"
            ? state.y - value
            : state.y,
        };
    }
  }

  const endState = file.split("\n").reduce<State>(
    (state: State, line: string) => {
      return move(line[0] as Action, Number(line.slice(1)), state);
    },
    { x: 0, y: 0, facing: "E" },
  );

  return Math.abs(endState.x) + Math.abs(endState.y);
}

export function secondStar() {
  function rotateWaypoint(
    state: StateWithWaypoint,
    value: number,
  ): StateWithWaypoint {
    const turnLeft = value < 0;
    let steps = Math.abs(value / 90);

    let waypoint = {
      wx: state.wx,
      wy: state.wy,
    };
    while (steps > 0) {
      steps--;
      waypoint = {
        wx: turnLeft ? waypoint.wy : -waypoint.wy,
        wy: turnLeft ? -waypoint.wx : waypoint.wx,
      };
    }

    return {
      ...state,
      ...waypoint,
    };
  }

  function move(
    action: Action,
    value: number,
    state: StateWithWaypoint,
  ): StateWithWaypoint {
    switch (action) {
      case "E":
        return {
          ...state,
          wx: state.wx + value,
        };
      case "W":
        return {
          ...state,
          wx: state.wx - value,
        };
      case "N":
        return {
          ...state,
          wy: state.wy - value,
        };
      case "S":
        return {
          ...state,
          wy: state.wy + value,
        };
      case "R":
        return {
          ...state,
          ...rotateWaypoint(state, value),
        };
      case "L":
        return {
          ...state,
          ...rotateWaypoint(state, -value),
        };
      case "F":
        return {
          ...state,
          x: state.x + state.wx * value,
          y: state.y + state.wy * value,
        };
    }
  }

  const endState = file.split("\n").reduce<StateWithWaypoint>(
    (state: StateWithWaypoint, line: string) =>
      move(line[0] as Action, Number(line.slice(1)), state),
    { x: 0, y: 0, wx: 10, wy: -1 },
  );

  return Math.abs(endState.x) + Math.abs(endState.y);
}

console.log(firstStar());
console.log(secondStar());
