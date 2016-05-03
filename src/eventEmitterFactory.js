/****
 * TODO check and document and test this!!
 */
const eventEmitterBase = {
    listeners: {},

    on(event, callback, group) {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }
        this.listeners[event].push({callback, group});
    },

    once(event, callback, group) {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }
        this.listeners[event].push({isOnce: true, callback, group});
    },

    emit(event, data) {
        if (this.listeners[event]) {
            this.listeners[event].forEach((listener) => {
                listener.callback(data);
            });

            this.listeners[event] = this.listeners[event].filter((listener) => listener.isOnce);
        }
    },

    off(event, callback) {
        if (this.listeners[event]) {
            this.listeners[event] = this.listeners[event].filter((listener) => listener.callback === callback);
        }
    },

    offGroup(group) {
        if (group) {
            let filteredListeners = {};
            for (let event in this.listeners) {
                if (this.listeners.hasOwnProperty(event)) {
                    filteredListeners[event] = this.listeners[event].filter((listener) => listener.group === group);
                }
            }
            this.listeners = filteredListeners;
        }
    }
};

export function eventEmitterFactory() {
    return Object.assign(eventEmitterBase, {
        listeners: {}
    });
}

