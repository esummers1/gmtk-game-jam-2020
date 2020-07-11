import { Entity } from './entity';

/**
 * Class used to encapsulate some Entity behaviour.
 */
export abstract class Component {

  public deleted: boolean;

  protected entity: Entity;

  constructor(private _key: Symbol) {}

  /**
   * Callback for when this Component is attached to an Entity.
   */
  onAttach(e: Entity): void {
    this.entity = e;
  }

  /**
   * Callback for when the parent Entity is added to the world.
   */
  onSpawn(): void {
    // Do nothing by default
  }

  /**
   * Cleans up this Component.
   */
  destroy(): void {
    // Do nothing by default
  }

  /**
   * Updates this Component by one frame.
   */
  update(delta: number): void {
    // Do nothing by default
  }

  get key() {
    return this._key;
  }

}