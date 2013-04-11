/**
 * Created with JetBrains WebStorm.
 * User: mauricio
 * Date: 4/10/13
 * Time: 12:43 AM
 * To change this template use File | Settings | File Templates.
 */

T3.Body = function (config) {
    config = config || {};

    T3.Object3D.call(this, config);

    T3.Body.prototype.init.call(this, config);
};

T3.inheritFrom(T3.Body, T3.Object3D);

T3.Body.prototype.materialOptions = {
    ambient: '#313131',     // ambient
    color: '#818181',       // diffuse
    specular: '#818181',    // specular
    shininess: 0.4 * 128    // shininess
};

/**
 * Init this object
 * @param {Object} config
 * @chainable
 */
T3.Body.prototype.init = function (config) {
    return this;
};

T3.Body.prototype.initDatGui = function (gui) {
    var me = this,
        folder = gui.addFolder(me.folder);
    folder
        .add(me, 'visible')
        .name('Show Body mesh')
        .onFinishChange(function (value) {
            scene[value ? 'add' : 'remove'](me.real);
        });

    folder
        .addColor(me.materialOptions, 'color')
        .name('Body Color')
        .onChange(function (value) {
            me.real.material.color.setHex(parseInt(value.substr(1), 16));
        });

    folder
        .addColor(me.materialOptions, 'specular')
        .name('Body specular')
        .onChange(function (value) {
            me.real.material.specular.setHex(parseInt(value.substr(1), 16));
        });

    folder
        .addColor(me.materialOptions, 'ambient')
        .name('Body ambient')
        .onChange(function (value) {
            me.real.material.ambient.setHex(parseInt(value.substr(1), 16));
        });

    folder
        .add(me.materialOptions, 'shininess', 0, 128)
        .name('Body shininess')
        .onChange(function (value) {
            me.real.material.shininess = value;
        });
};

T3.Body.prototype.update = function (delta) {
    if (this.real) {
        this.real.rotation.y += 0.01;
    }
};