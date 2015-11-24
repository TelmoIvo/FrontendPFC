var storearray = new Ext.data.ArrayStore({
    fields: [
        {name: 'comment'},
        {name: 'date',type : "date"}

    ]
});

Ext.define('DevJS.view.users.List', {
    extend: 'Ext.grid.Panel',
    features: [{
        ftype: 'grouping',
groupHeaderTpl: '{vid} Veiculo : {[values.rows[0].data["vid"]]} - Numero de Incidentes : {children.length}',
enableNoGroups:true
}],

autoHeight: true,
    forceFit: true,
    viewConfig: {
        autoFill: true,
        scrollOffset: 0
    },
    xtype: 'usersList',
    title: 'Header',
    viewConfig: {
        enableTextSelection: true,
        stripeRows: true,
        listeners: {
            rowselect: function (sm, row, rec) {
                Ext.getCmp("form").getForm().loadRecord(rec);
            },
            refresh: function (dataview) {
                Ext.each(dataview.panel.columns, function (column) {
                    if (column.autoSizeColumn === true)
                        column.autoSize();
                })
            }
        }
    },

    store: 'Users',

    initComponent: function () {
        var me = this,
            rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
                clicksToEdit: 2
            }),
            rowMenu = Ext.create('Ext.menu.Menu', {
                height: 58,
                items: [{
                    text: 'Edit',
                    iconCls: 'button-edit'
                }, {
                    text: 'Remove',
                    iconCls: 'button-remove',
                    handler: function () {
                        me.fireEvent('removeRow', this);
                    }
                }]
            });

        this.listeners = {
            itemcontextmenu: function (view, record, item, index, e) {
                e.stopEvent();
                rowMenu.showAt(e.getXY());
            }
        };

        this.plugins = [rowEditing];
        this.selType = 'rowmodel';
        this.dockedItems = [
            {
                xtype: 'pagingtoolbar',
                dock: 'top',
                displayInfo: true,
                store: 'Users'
            }
        ];


        this.columns = [
            {text: 'Id', dataIndex: '_id', hidden: true},
            {
                text: 'Vid',
                id:'vid',
                dataIndex: 'vid',
                renderer : function (value){
                    return "";
                },
                autoSizeColumn: true
            },
            {
                text: 'TMX',
                dataIndex: 'tmx',
                renderer: Ext.util.Format.dateRenderer('d/m/Y H:i:s'),
                name: 'tmx',
                autoSizeColumn: true
            },
            {
                text: 'Causa',
                dataIndex: 'anomalia',
                renderer: function (value, metaData, record, row, col, store, gridView) {
                    String.prototype.contains = function (v) {
                        return this.indexOf(it) != -1;
                    };
                    if (value.indexOf("FLAPPING") != -1) {
                        return '<img src="../images/admin/icons/podcast.png">' + value;
                    }
                    else {
                        return value;
                    }
                },
                autoSizeColumn: true

            },
            {
                text: 'Nivel de Alerta',
                dataIndex: 'color',
                renderer : function(value, meta) {
                    if(value == "Red") {
                        meta.style = "background-color:red;";
                    } else if ( value == "Orange") {
                        meta.style = "background-color:orange;";
                    }
                    else if (value == "Yellow"){
                        meta.style = "background-color:yellow;";
                    }
                    else {
                        meta.style = "background-color:green;";

                    }
                },
                autoSizeColumn: true,
                editor: {
                    xtype: 'combo',
                    store: new Ext.data.SimpleStore({
                        data: [['Red'],
                            ['Orange'],
                            ['Yellow'],
                            ['Green']],
                        id: 1,
                        fields: ['text']
                    }),
                    valueField: 'text',
                    value: 0,
                    triggerAction: 'all',
                    editable: false,
                    flex: 1,
                    renderer : function(value, meta) {
                        if(value == "Red") {
                            meta.style = "background-color:red;";
                        } else if ( value == "Orange") {
                            meta.style = "background-color:orange;";
                        }
                        else if (value == "Yellow"){
                            meta.style = "background-color:yellow;";
                        }
                        else {
                            meta.style = "background-color:green;";

                        }
                    },
                    listeners: {
                        'select': function (combo, record) {
                            closedStatusSelectedID = this.getValue();
                        }
                    }
                }
            }, {
                text: 'Comments',
                dataIndex: 'comments',
                name: 'comments',
                autoSizeColumn: true,
                renderer: function (value) {

                    return value.length;
                }
            },
            {
                xtype: 'actioncolumn',
                autoSizeColumn: true,
                menuDisabled: true,
                items: [
                    {
                        iconCls: 'button-edit',
                        tooltip: 'Edit',
                        handler: function (grid, rowIndex, colIndex) {
                            this.up('grid').fireEvent('editRow', grid, rowIndex, colIndex);
                        }
                    },
                    {
                        iconCls: 'button-info',
                        itemId: 'Comments',
                        text: 'Comments',
                        handler: function (grid, rowIndex, colIndex) {
                            win.record = grid.getStore().getAt(rowIndex);
                            var mydata = win.record.get('comments');
                            storearray.loadData(mydata);
                            storearray.sort('date', 'DESC');
                            win.show()
                        }
                    }
                ]
            }
        ];

        //parent
        this.callParent(arguments);
    }
});

var form = new Ext.form.FormPanel({
    width: 800,
    dateFormat: 'm-d-Y g:i A',
    items: [{text: 'tmx', dataIndex: 'tmx', hidden: true},
        {
        xtype: 'grid',
            autoSync: true,
            height:200,
            autoScroll: true,
            flex: 1,
        store: storearray,
            margin: "0 0 10 0",
        columns: [
            {id: 'comment', header: "Text", flex:1, sortable: true, dataIndex: 'comment'},
            {id: 'date',
                header: "Date",
                renderer: Ext.util.Format.dateRenderer('d/m/Y H:i:s'),
                flex: 1, sortable: true, dataIndex: 'date'}
        ], layout: {
            type: 'fit'
        }
    }, {
        xtype:'textarea',
            id:'new',
        text:'Add Comment',
            style: 'width: 100%',
        fieldLabel: 'Add Comment',
        layout: {
        },
        name:'comment'
    }

    ],dockedItems: [
        {
            xtype: 'toolbar',
            flex: 1,
            dock: 'bottom',
            ui: 'footer',
            layout: {
                pack: 'end',
                type: 'hbox'
            },
            items: [
                    {
                    xtype: 'button',
                    text: 'Save',
                    itemId: 'save',
                    iconCls: 'save',
                    handler: function (form, rowIndex, colIndex) {
                        var recform = this.up('form').getForm().getRecord();
                        var names = recform.get('comments');
                        recform.get('comments');
                        var arraysize = names.length;
                        var val = Ext.getCmp('new').getValue();
                        var actual = new Date().toISOString();

                        if(val == "") {
                            alert('Comentario Vazio')
                        }
                        else{
                            names.push({'comment': val, 'date': new Date(actual)});
                            this.up('form').getForm().updateRecord(recform);
                          //  recform.save()
                            recform.save({
                                success: function(rec) {
                                    var comp = Ext.ComponentQuery.query('form');
                                    var form = comp[0].getForm();
                                    form.loadRecord(rec);
                                    form.reset();
                                    var mydata = recform.get('comments');
                                    storearray.loadData(mydata);
                                    storearray.sort('date', 'DESC');
                                    form.getForm().loadRecord(recform);
                                }})
                            /*
                            var newRecord = store.sync();
                            var x = this.up('form').getForm().setRecord(newRecord)
                            var mydata = newRecord.get('comments');
                            storearray.loadData(mydata);
                            this.up('form').getForm().loadRecord(x);
                            this.up('form').getForm().refresh();
                            this.up('form').getForm().clear('new');
*/
                        }
                    }
                }
            ]
        }
    ]
});

var win = new Ext.Window({
    title: 'Comments',
    closeAction: 'hide',
    layout:"fit",
    closable: true,
    items: [{
        xtype: 'panel',
        items: [form]
    }],
    listeners: {
        beforeshow: function (window) {
            if (window.record) form.getForm().loadRecord(window.record);

        }
    }
});

