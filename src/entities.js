import { _Entity } from './entity.js';

let requireCalled = 0;

export const _entities = {
    require(entityList) {
        return new Promise(async (resolve, reject) => {
            requireCalled++;

            const _this = this;

            // Check if `entities.require` was called multiple times
            if (requireCalled > 1)
                reject('`entities.require` can only be called once. If you want to add entities individually, use `entities.add`.');

            // Check if `entityList` is an array
            if (!(entityList instanceof Array))
                reject('Paramater passed into `entities.require` must be an array of entities.');

            // Check if each entity in `entityList` extends the `Entity` class
            entityList.forEach(entity => {
                const e = new entity();

                if (!(e instanceof _Entity))
                    reject('All items in array passed into `entities.require` must extend the `Entity` class.');

                // Add entity
                _this[e.constructor.name] = e;
            });

            resolve({ added: true });
        });
    },
    add(entity) {
        return new Promise(async (resolve, reject) => {
            // Check if `entity` extends the `Entity` class
            const e = new entity();

            if (!(e instanceof _Entity))
                reject('Paramater passed into `entities.add` must extend the `Entity` class.');

            // Add entity
            this[e.constructor.name] = e;

            resolve({ added: true });
        });
    }
};