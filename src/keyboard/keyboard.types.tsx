// Here we define the overall map of shortcut


// Actual function that will trigger the action when the shortcut is pressed
export type ActionHandler = () => void;


export interface ShortcutDefinition {
    id: string; // Unique identifier for the shortcut
    description: string; // Description of what the shortcut does
    keys: string[]; // Array of keys that make up the shortcut (e.g., ['Ctrl', 'S'])
    alt?: boolean; // Separated field as we may override this in future
}



