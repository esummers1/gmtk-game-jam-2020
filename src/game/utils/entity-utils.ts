import { Entity } from '../entity';
import { HitboxComponent } from '../components/hitbox.component';

/**
 * Extracts the HitboxComponent from an Entity, if it has one.
 */
export const getHitboxFrom = (entity: Entity): HitboxComponent => {
  return <HitboxComponent> entity.getComponent(HitboxComponent.KEY);
};