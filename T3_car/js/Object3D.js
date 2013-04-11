/**
 * Created with JetBrains WebStorm.
 * User: mauricio
 * Date: 4/10/13
 * Time: 1:58 PM
 * To change this template use File | Settings | File Templates.
 */

/*
    Global:
    THREE
    T3.ObjectManager
 */

/**
 * Abstract class used represent a group of objects
 * @abstract
 * @constructor
 * @extends THREE.Object3D
 */
T3.Object3D = function (config) {
    config = config || {};

    THREE.Object3D.call(this);

    /**
     * Name of this object
     * @type {string}
     */
    this.name = config.name;

    /**
     * Visibility of this object
     * @type {Object}
     */
    this.visible = config.visible || true;

    /**
     * Name of this object
     * @type {string}
     */
    this.addToScene = config.addToScene || true;

    /**
     * `this` instance is just a wrapper to a inner element
     * which might be a Mesh, Object3D or camera
     * The real instance is stored in `this.object`
     */
    this.real = config.real || null;

    T3.Object3D.prototype.init.call(this, config);
};

T3.inheritFrom(T3.Object3D, THREE.Object3D);

/**
 * Adds this objects to the ObjectManager
 * @param {Object} config
 * @chainable
 */
T3.Object3D.prototype.init = function (config) {

    if (typeof config.update === 'function') {
        T3.Object3D.prototype.update = config.update;
    }

    T3.ObjectManager.addObject(this.name, this, this.addToScene);
    return this;
};

/**
 * Updates the instance datGUI if required to add new properties and folders
 * @param {dat.GUI} datGUI
 * @abstract
 */
T3.Object3D.prototype.initDatGui = function (datGUI) {
};

/**
 * Updates the properties of this Object3D, typically
 * this is the function that must be overriden
 * @abstract
 */
T3.Object3D.prototype.update = function (delta) {
};