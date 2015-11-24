Ext.define('DevJS.view.Viewport', {
    extend: 'Ext.container.Viewport',

    layout: 'border',

    items: [
        {
            region: 'north',
            margins: 5,
            height: 50,
            xtype: 'container'
        },
        
        {
            title: 'Historico',
            region: 'center',
            layout:'fit',
            items: [
                {
                    title: '',
                    xtype: 'usersList'
                }
            ]
        }
    ]
});
