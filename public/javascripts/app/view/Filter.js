Ext.define('DevJS.view.Filter', {
    extend: 'Ext.form.Panel',

    xtype: 'filter-form',
    title: 'Filter',

    border: false,
    padding: 10,

    initComponent: function () {
        var me = this;

       

        //parent
        this.callParent(arguments);
    }
});