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
