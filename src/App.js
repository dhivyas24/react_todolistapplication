import "./App.css";
import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import _ from "lodash";
import { v4 } from "uuid";
import {
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  Button
} from "@mui/material";

//import addbutton from './add-button.png';
//import raspberrysans from './raspberryicon.png';

function App() {
  const [text, setText] = useState("");
  const [state, setState] = useState({
    todo: {
      title: "To-Do",
      items: [],
      css: {
        "border-color": "red"
      }
    },
    inprogress: {
      title: "In-Progress",
      items: [],
      css: {
        "border-color": "yellow"
      }
    },
    done: {
      title: "Done",
      items: [],
      css: {
        "border-color": "green"
      }
    }
  });

  const handleDragEnd = ({ destination, source }) => {
    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source
    )
      return;

    const itemcopy = { ...state[source.droppableId].items[source.index] };
    console.log(destination);

    setState((prev) => {
      prev = { ...prev };
      prev[source.droppableId].items.splice(source.index, 1);
      prev[destination.droppableId].items.splice(
        destination.index,
        0,
        itemcopy
      );
      return prev;
    });
  };

  const addItem = () => {
    if (!text) return;
    setState((prev) => {
      return {
        ...prev,
        todo: {
          title: "To-Do",
          items: [{ id: v4(), name: text }, ...prev.todo.items]
        }
      };
    });
    setText("");
  };
  const [open, setOpen] = React.useState(false);

  const handleClickToOpen = () => {
    setOpen(true);
  };

  const handleToClose = () => {
    setOpen(false);
  };

  return (
    <div className="App">
      <br />

      <div class="header"> To Do List Application</div>
      <div className="add_todo">
        <Dialog open={open} onClose={handleToClose}>
          <DialogTitle>{"Add New Task"}</DialogTitle>
          <DialogContent>
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                handleToClose();
                addItem();
              }}
              color="primary"
              autoFocus
            >
              Submit
            </Button>
          </DialogActions>
        </Dialog>

        <Button
          variant="outlined"
          color="primary"
          className="addbutton"
          onClick={handleClickToOpen}
        >
          {" "}
          + NewTask
        </Button>
      </div>
      <div className="drop">
        <DragDropContext onDragEnd={handleDragEnd}>
          {_.map(state, (data, key) => {
            return (
              <div key={key} className="column">
                <h2 className="datatitle" style={data.css}>
                  {data.title}
                </h2>

                <Droppable droppableId={key}>
                  {(provided) => {
                    return (
                      <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className="droppable_column"
                      >
                        {data.items.map((element, index) => {
                          return (
                            <Draggable
                              key={element.id}
                              index={index}
                              draggableId={element.id.toString()}
                              className="draggable_item"
                            >
                              {(provided) => {
                                return (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    className={key.toString()}
                                  >
                                    {element.name}
                                  </div>
                                );
                              }}
                            </Draggable>
                          );
                        })}
                        {provided.placeholder}
                      </div>
                      //console.log(draggableId);  </div>
                    );
                  }}
                </Droppable>
              </div>
            );
          })}
        </DragDropContext>
      </div>
    </div>
  );
}

export default App;
