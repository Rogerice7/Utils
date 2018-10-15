const PopupMenu = imports.ui.popupMenu;
const Mainloop = imports.mainloop;
const Applet = imports.ui.applet;
const Settings = imports.ui.settings;
const GLib = imports.gi.GLib;

function CPUFrequencyApplet(metadata, orientation, instance_id) {
  this._init(metadata, orientation, instance_id);
}

CPUFrequencyApplet.prototype = {
  __proto__: Applet.TextApplet.prototype,

  _init: function(metadata, orientation, instance_id) {
    Applet.TextApplet.prototype._init.call(this, orientation, instance_id);

    this.isLooping = true;
    this.state = {};

    this.settings = new Settings.AppletSettings(this.state, metadata.uuid, instance_id);
    this.settings.bindProperty(Settings.BindingDirection.IN, 'interval', 'interval');

    // Create the popup menu
    this.menuManager = new PopupMenu.PopupMenuManager(this);
    this.menu = new Applet.AppletPopupMenu(this, orientation);
    this.menuManager.addMenu(this.menu);

    this.set_applet_tooltip('CPU Frequency');

    this.updateFrequency();
    this.loopId = Mainloop.timeout_add(this.state.interval, () => this.updateFrequency());
  },

  on_applet_clicked: function() {
    this.buildMenu(this.menuItems);
    this.menu.toggle();
  },

  on_applet_removed_from_panel: function() {
    Mainloop.source_remove(this.loopId);
    this.loopId = 0;
    this.isLooping = false;
    this.settings.finalize();
  },

  buildMenu: function() {
    this.menu.removeAll();
    let isOpen = this.menu.isOpen;
    let section = new PopupMenu.PopupMenuSection();
    let item = new PopupMenu.PopupMenuItem("CPU Frequency : " + this.title);

    section.addMenuItem(item);
    this.menu.addMenuItem(section);
    if (isOpen) {
      this.menu.open();
    }
  },

  updateFrequency: function() {
    if (!this.isLooping) {
      return false;
    }

    this.title = GLib.spawn_command_line_sync('.local/share/cinnamon/applets/frequency@x-hgg-x/frequency.sh')[1].toString();

    if (this._applet_label.text !== this.title) {
      this.set_applet_label(this.title);
    }

    return true;
  }
};

function main(metadata, orientation, instance_id) {
  return new CPUFrequencyApplet(metadata, orientation, instance_id);
}
