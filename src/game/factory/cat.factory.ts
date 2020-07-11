import { Entity } from '../entity';

// Components
import {
  CatMetaComponent,
  HitboxComponent,
  WanderComponent,
  AnimatedSpriteComponent,
  ScaredComponent,
  JailableComponent,
  RescueComponent,
  LateComponent
} from '../components';

/**
 * Generates a cat entity
 */
export const createCat = (x: number, y: number): Entity => {
  // Generate the meta before anything else;
  const catMeta = new CatMetaComponent();
  const animatedSprite = new AnimatedSpriteComponent(catMeta.variety);

  const catEntity = new Entity()
    .attach(catMeta)
    .attach(new HitboxComponent(x, y, 30, 30))
    .attach(animatedSprite)
    .attach(new WanderComponent(100, 200))
    .attach(new JailableComponent())
    .attach(new ScaredComponent())
    .attach(new RescueComponent())
    .attach(new LateComponent());

  return catEntity;
};
