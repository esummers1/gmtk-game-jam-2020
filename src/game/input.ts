interface KeyHandler {
  value: String;
  isDown: boolean;
  isUp: boolean;
  press?: Function;
  release?: Function;
  downHandler?: any;
  upHandler?: any;
  unsubscribe?: Function;
}

interface KeyBinding {
  name: String;
  value: String;
}

export class Input {

  // Game keys
  public static readonly UP = 'Up';
  public static readonly DOWN = 'Down';
  public static readonly LEFT = 'Left';
  public static readonly RIGHT = 'Right';

  // Key bindings
  public static readonly BINDINGS: KeyBinding[] = [
    { name: Input.UP, value: 'w' },
    { name: Input.DOWN, value: 's' },
    { name: Input.LEFT, value: 'a' },
    { name: Input.RIGHT, value: 'd' },
  ];

  // State of currently-pressed keys
  private pressedKeys: Map<String, boolean> = new Map();

  constructor() {
    Input.BINDINGS.forEach((binding: KeyBinding) => {
      // Create handler
      const handler = this.registerKeyHandler(binding.value);

      // Add entry to keymap
      this.pressedKeys.set(binding.name, false);

      // Register handler callbacks
      handler.press = () => this.pressedKeys.set(binding.name, true);
      handler.release = () => this.pressedKeys.set(binding.name, false);
    });
  }

  /**
   * Checks whether the key with the given name is currently pressed.
   */
  isPressed = (keyName: String) => this.pressedKeys.get(keyName);

  /**
   * Registers a handler for a certain key, returning a KeyHandler.
   *
   * Adapted from https://github.com/kittykatattack/learningPixi#keyboard.
   */
  private registerKeyHandler(value: String): KeyHandler {
    let keyHandler: KeyHandler = {
      value: value,
      isDown: false,
      isUp: true
    };

    keyHandler.downHandler = (event: any) => {
      if (event.key === keyHandler.value) {
        if (keyHandler.isUp && keyHandler.press) {
          keyHandler.press();
        }
        keyHandler.isDown = true;
        keyHandler.isUp = false;
        event.preventDefault();
      }
    };

    keyHandler.upHandler = (event: any) => {
      if (event.key === keyHandler.value) {
        if (keyHandler.isDown && keyHandler.release) {
          keyHandler.release();
        }
        keyHandler.isDown = false;
        keyHandler.isUp = true;
        event.preventDefault();
      }
    };

    // Create event listeners
    const downListener = keyHandler.downHandler.bind(keyHandler);
    const upListener = keyHandler.upHandler.bind(keyHandler);

    // Attach event listeners
    window.addEventListener('keydown', downListener, false);
    window.addEventListener('keyup', upListener, false);

    // Enable detachment of listeners
    keyHandler.unsubscribe = () => {
      window.removeEventListener('keydown', downListener);
      window.removeEventListener('keyup', upListener);
    };

    return keyHandler;
  }
}