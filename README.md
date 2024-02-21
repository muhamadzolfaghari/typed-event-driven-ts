# Type Definition of Event-Driven by Typescript

The interface is a point that coordinates or describes the shape of data. This utility of TypeScript leads to handling a variety of data structures where there is a need to assign type definitions to the shape.

Although the interface is a useful tool for creating a particular type definition, the "type" keyword offers a better way to combine or extend interfaces or other types. It is especially useful for creating complex types. However, in situations where interfaces result in a complex structure that is difficult to read, the "type" keyword can provide a more concise and readable alternative.

In this example, the goal is to provide a type definition for an event-driven.

 Firstly, interfaces are created to provide structure to each event data.

Secondly, two types play a main role in creating reusable types that are used in following codes.

Thirdly, a condition type similar to the switch case offers an adequate interface for each specific event type.

Fourthly, an imaginary Uploader class is provided to illustrate the implementation of a class that obligation to subscribe or unsubscribe for each event.

Finally, the new instance of the Upload class allows to adding or removing of event listeners as each callback has an appropriate event type.


```ts
// These interfaces provide a structure for event-driven data
interface UploadStartEvent {
  type: "upload-start";
  timestamp: string;
}

interface UploadingEvent {
  type: "uploading";
  progressPercentage: number;
}

interface UploadEndEvent {
  type: "upload-end";
  totalFiles: number;
}

// --------------------------------------------------------------------------------
// A union type for merge some interfaces into a specific type
type UploadEvents = UploadStartEvent | UploadingEvent | UploadEndEvent;
// Get a type as sort of keys such as, upload-start, loading, upload-end.
type UploadEventType = UploadEvents["type"];

// Provide a complex type as a conditional situation to pick a suitable UploadEvent payload for a callback function.
type EventCallback<K extends UploadEventType> = (
  data: K extends "upload-start"
    ? UploadStartEvent
    : K extends "uploading"
      ? UploadingEvent
      : K extends "upload-end"
        ? UploadEndEvent
        : never,
) => void;

// --------------------------------------------------------------------------------
// An imaginary Uploader class to handle progress of upload and able to add or remove event listeners.
class Uploader {
  // These event get a type and callback to store function to subscribe and unsubscribe for a specific event.
  on<Type extends UploadEventType>(type: Type, callback: EventCallback<Type>) {}

  off<Type extends UploadEventType>(
    type: Type,
    callback: EventCallback<Type>,
  ) {}
}

// --------------------------------------------------------------------------------
// After create an uploader instance, it can be accessed to related callback type due to the event type.
const uploader = new Uploader();
uploader.on("upload-start", ({ timestamp }) => {});
uploader.on("uploading", ({ progressPercentage }) => {});
uploader.off("upload-end", ({ totalFiles }) => {});
```
