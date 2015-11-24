Ext.define('DevJS.model.User', {
    extend: 'Ext.data.Model',

    proxy: {
        type: 'rest',
        url : '/users',
        reader: {
            type: 'json',
            root: 'User'
        }
    },

    fields: [
        {
            name: 'vid'
        },
		{
			name:'tmx'
		},
		{
			name:'anomalia'
		},
		{
			name:'color'
		},
        {
            name:'comments'
        },
        {
            name: '_id',
            defaultValue: null
        }
    ]
});
